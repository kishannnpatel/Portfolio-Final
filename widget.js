/* ---------- widget compteur de visites (API publique, sans compte ni secret) ---------- */
var FB_CONFIG = {
  COUNTER_BASE: 'https://abacus.jasoncameron.dev',
  COUNTER_NAMESPACE: 'kishanpatel-fr-portfolio' // identifiant unique pour éviter les collisions avec d'autres sites
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

  function ns() {
    return encodeURIComponent(FB_CONFIG.COUNTER_NAMESPACE);
  }

  function hitCount(key) {
    return fetch(FB_CONFIG.COUNTER_BASE + '/hit/' + ns() + '/' + key)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) { return data && typeof data.value === 'number' ? data.value : null; })
      .catch(function () { return null; });
  }

  function registerVisit() {
    hitCount('visits').then(function (v) {
      if (v !== null) visitsEl.textContent = v;
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
