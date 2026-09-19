/* ---------- widget avis visiteurs ---------- */
/* Remplis ces 3 valeurs une fois tes comptes Supabase / Formspree créés. */
var FB_CONFIG = {
  SUPABASE_URL: 'https://XXXXXXXXXXXX.supabase.co',
  SUPABASE_ANON_KEY: 'REMPLACE_MOI',
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/REMPLACE_MOI'
};

(function () {
  var widget = document.getElementById('fb-widget');
  if (!widget) return;

  var header = document.getElementById('fbHeader');
  var minBtn = document.getElementById('fbMinBtn');
  var closeBtn = document.getElementById('fbCloseBtn');
  var reopenBtn = document.getElementById('fbReopenBtn');
  var visitsEl = document.getElementById('fbVisits');
  var likesEl = document.getElementById('fbLikes');
  var dislikesEl = document.getElementById('fbDislikes');
  var likeBtn = document.getElementById('fbLikeBtn');
  var dislikeBtn = document.getElementById('fbDislikeBtn');
  var commentBox = document.getElementById('fbCommentBox');
  var commentText = document.getElementById('fbCommentText');
  var commentError = document.getElementById('fbCommentError');
  var cancelBtn = document.getElementById('fbCancelBtn');
  var sendBtn = document.getElementById('fbSendBtn');
  var thanksEl = document.getElementById('fbThanks');

  function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }
  function ssGet(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function ssSet(key, val) {
    try { sessionStorage.setItem(key, val); } catch (e) {}
  }

  function supaHeaders(extra) {
    var h = {
      'apikey': FB_CONFIG.SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + FB_CONFIG.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    };
    if (extra) { for (var k in extra) { h[k] = extra[k]; } }
    return h;
  }

  function fetchStats() {
    fetch(FB_CONFIG.SUPABASE_URL + '/rest/v1/pf_stats?select=visits,likes,dislikes&id=eq.1', {
      headers: supaHeaders()
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rows) {
        if (rows && rows[0]) { applyStats(rows[0]); }
      })
      .catch(function () {});
  }

  function applyStats(row) {
    if (typeof row.visits === 'number') visitsEl.textContent = row.visits;
    if (typeof row.likes === 'number') likesEl.textContent = row.likes;
    if (typeof row.dislikes === 'number') dislikesEl.textContent = row.dislikes;
  }

  function callRpc(fnName) {
    return fetch(FB_CONFIG.SUPABASE_URL + '/rest/v1/rpc/' + fnName, {
      method: 'POST',
      headers: supaHeaders(),
      body: '{}'
    }).then(function (r) { return r.ok ? r.json() : null; });
  }

  function registerVisit() {
    if (ssGet('fb_visited')) return;
    ssSet('fb_visited', '1');
    callRpc('increment_visits').then(function (val) {
      if (typeof val === 'number') visitsEl.textContent = val;
    }).catch(function () {});
  }

  /* ---------- like / dislike ---------- */

  var reaction = lsGet('fb_reaction'); // 'like' | 'dislike' | null

  function applyReactionUI() {
    if (reaction === 'like') {
      likeBtn.classList.add('fb-active');
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    } else if (reaction === 'dislike') {
      dislikeBtn.classList.add('fb-active');
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    }
  }
  applyReactionUI();

  likeBtn.addEventListener('click', function () {
    if (reaction) return;
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
    callRpc('increment_likes').then(function (val) {
      if (typeof val === 'number') likesEl.textContent = val;
      reaction = 'like';
      lsSet('fb_reaction', 'like');
      likeBtn.classList.add('fb-active');
    }).catch(function () {
      likeBtn.disabled = false;
      dislikeBtn.disabled = false;
    });
  });

  dislikeBtn.addEventListener('click', function () {
    if (reaction) return;
    commentBox.hidden = false;
    commentText.focus();
  });

  cancelBtn.addEventListener('click', function () {
    commentBox.hidden = true;
    commentText.value = '';
    commentError.hidden = true;
  });

  sendBtn.addEventListener('click', function () {
    var text = commentText.value.trim();
    if (!text) {
      commentError.hidden = false;
      return;
    }
    commentError.hidden = true;
    sendBtn.disabled = true;
    cancelBtn.disabled = true;

    var emailBody = {
      message: text,
      page: location.href,
      date: new Date().toISOString()
    };

    fetch(FB_CONFIG.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(emailBody)
    }).catch(function () {}).then(function () {
      return callRpc('increment_dislikes');
    }).then(function (val) {
      if (typeof val === 'number') dislikesEl.textContent = val;
      reaction = 'dislike';
      lsSet('fb_reaction', 'dislike');
      dislikeBtn.classList.add('fb-active');
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      commentBox.hidden = true;
      thanksEl.hidden = false;
    }).catch(function () {
      sendBtn.disabled = false;
      cancelBtn.disabled = false;
    });
  });

  /* ---------- minimize / close / reopen ---------- */

  function setMinimized(on) {
    widget.classList.toggle('fb-minimized', on);
    minBtn.textContent = on ? '+' : '–';
    minBtn.title = on ? 'Agrandir' : 'Réduire';
    lsSet('fb_minimized', on ? '1' : '0');
  }
  minBtn.addEventListener('click', function () {
    setMinimized(!widget.classList.contains('fb-minimized'));
  });
  if (lsGet('fb_minimized') === '1') setMinimized(true);

  function setClosed(on) {
    widget.hidden = on;
    reopenBtn.hidden = !on;
    lsSet('fb_closed', on ? '1' : '0');
  }
  closeBtn.addEventListener('click', function () { setClosed(true); });
  reopenBtn.addEventListener('click', function () { setClosed(false); });
  if (lsGet('fb_closed') === '1') setClosed(true);

  /* ---------- drag ---------- */

  function applyPos(pos) {
    widget.style.top = pos.top + 'px';
    widget.style.left = pos.left + 'px';
    widget.style.right = 'auto';
  }

  var savedPos = lsGet('fb_pos');
  if (savedPos) {
    try {
      var pos = JSON.parse(savedPos);
      if (pos && typeof pos.top === 'number' && typeof pos.left === 'number') {
        applyPos(pos);
      }
    } catch (e) {}
  }

  var dragging = false, dragOffsetX = 0, dragOffsetY = 0;

  header.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.fb-icon-btn')) return;
    dragging = true;
    widget.classList.add('fb-dragging');
    var rect = widget.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    header.setPointerCapture(e.pointerId);
  });

  header.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var top = e.clientY - dragOffsetY;
    var left = e.clientX - dragOffsetX;
    top = Math.max(0, Math.min(top, window.innerHeight - 40));
    left = Math.max(0, Math.min(left, window.innerWidth - 40));
    applyPos({ top: top, left: left });
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    widget.classList.remove('fb-dragging');
    var rect = widget.getBoundingClientRect();
    lsSet('fb_pos', JSON.stringify({ top: rect.top, left: rect.left }));
  }
  header.addEventListener('pointerup', endDrag);
  header.addEventListener('pointercancel', endDrag);

  /* ---------- init ---------- */

  fetchStats();
  registerVisit();
})();
