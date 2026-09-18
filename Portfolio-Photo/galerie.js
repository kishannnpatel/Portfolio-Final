let photoList = [];
let currentPhotoIndex = 0;

function updateViewerUI() {
  const img = document.getElementById('viewerImage');
  const counter = document.getElementById('viewerCounter');
  const prevBtn = document.getElementById('viewerPrev');
  const nextBtn = document.getElementById('viewerNext');
  const photo = photoList[currentPhotoIndex];

  if (img && photo) { img.src = photo.src; img.alt = photo.alt; }
  if (counter) {
    counter.textContent = photoList.length > 1
      ? (currentPhotoIndex + 1) + ' / ' + photoList.length
      : '';
  }
  const multi = photoList.length > 1;
  if (prevBtn) prevBtn.style.display = multi ? '' : 'none';
  if (nextBtn) nextBtn.style.display = multi ? '' : 'none';
}

window.openImageViewer = function (imageSrc, altText) {
  const viewer = document.getElementById('imageViewer');
  if (!viewer) return;

  const idx = photoList.findIndex(p => p.src === imageSrc || imageSrc.endsWith(p.src) || p.src.endsWith(imageSrc));
  if (idx !== -1) {
    currentPhotoIndex = idx;
  } else {
    photoList = [{ src: imageSrc, alt: altText || '' }];
    currentPhotoIndex = 0;
  }

  updateViewerUI();
  viewer.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

window.closeImageViewer = function () {
  const viewer = document.getElementById('imageViewer');
  if (!viewer) return;
  viewer.classList.remove('is-open');
  document.body.style.overflow = '';
};

window.viewerNav = function (direction) {
  if (!photoList.length) return;
  currentPhotoIndex = (currentPhotoIndex + direction + photoList.length) % photoList.length;
  updateViewerUI();
};

document.addEventListener('DOMContentLoaded', function () {
  // Build navigation list from photo cards
  document.querySelectorAll('.photo-card img').forEach(img => {
    photoList.push({ src: img.getAttribute('src'), alt: img.alt });
  });

  // Copy/paste deterrent
  document.body.classList.add('no-copy');
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('copy', (e) => e.preventDefault());
  document.addEventListener('cut', (e) => e.preventDefault());
  document.addEventListener('dragstart', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    const viewer = document.getElementById('imageViewer');
    if (viewer && viewer.classList.contains('is-open')) {
      if (e.key === 'Escape') window.closeImageViewer();
      else if (e.key === 'ArrowLeft') window.viewerNav(-1);
      else if (e.key === 'ArrowRight') window.viewerNav(1);
    }
  });

  // Theme toggle — matches the main portfolio's #themeToggle behavior
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const setLabel = function () {
      themeBtn.textContent = root.classList.contains('dark') ? 'Clair' : 'Sombre';
    };
    setLabel();
    themeBtn.addEventListener('click', function () {
      root.classList.toggle('dark');
      try { localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
      setLabel();
    });
  }

  // Back to top — matches the main portfolio's #backToTop behavior
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleVisible = function () {
      if (window.scrollY > window.innerHeight * 0.6) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    };
    toggleVisible();
    window.addEventListener('scroll', toggleVisible, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
