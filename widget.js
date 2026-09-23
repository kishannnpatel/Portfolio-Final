/* ---------- widget compteur de visites (via ton propre GitHub, aucun service tiers) ---------- */
/* Remplis ces 2 valeurs une fois le Gist et le token créés (voir les instructions envoyées). */
var FB_CONFIG = {
  GIST_ID: 'ad6173cbabdf69fda4c06abd38d1dee6',
  GITHUB_TOKEN: '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',
  GIST_FILENAME: 'gistfile1.txt'
};

(function () {
  var widget = document.getElementById('fb-widget');
  if (!widget) return;

  var header = document.getElementById('fbHeader');
  var minBtn = document.getElementById('fbMinBtn');
  var closeBtn = document.getElementById('fbCloseBtn');
  var reopenBtn = document.getElementById('fbReopenBtn');
  var visitsEl = document.getElementById('fbVisits');

  function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }
  /* ---------- compteur (Gist GitHub) ---------- */

  function apiHeaders() {
    return {
      'Authorization': 'token ' + FB_CONFIG.GITHUB_TOKEN,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    };
  }

  function readGist() {
    return fetch('https://api.github.com/gists/' + FB_CONFIG.GIST_ID, {
      headers: apiHeaders()
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.files || !data.files[FB_CONFIG.GIST_FILENAME]) return 0;
        try {
          var parsed = JSON.parse(data.files[FB_CONFIG.GIST_FILENAME].content);
          return typeof parsed.visits === 'number' ? parsed.visits : 0;
        } catch (e) {
          return 0;
        }
      })
      .catch(function () { return null; });
  }

  function writeGist(value) {
    var body = { files: {} };
    body.files[FB_CONFIG.GIST_FILENAME] = { content: JSON.stringify({ visits: value }) };
    return fetch('https://api.github.com/gists/' + FB_CONFIG.GIST_ID, {
      method: 'PATCH',
      headers: apiHeaders(),
      body: JSON.stringify(body)
    }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  function registerVisit() {
    readGist().then(function (current) {
      if (current === null) return;
      var next = current + 1;
      visitsEl.textContent = next;
      writeGist(next);
    });
  }

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

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    widget.classList.remove('fb-dragging');
    var rect = widget.getBoundingClientRect();
    lsSet('fb_pos', JSON.stringify({ top: rect.top, left: rect.left }));
  }
  header.addEventListener('pointerup', endDrag);
  header.addEventListener('pointercancel', endDrag);

  /* ---------- init ---------- */

  registerVisit();
})();
