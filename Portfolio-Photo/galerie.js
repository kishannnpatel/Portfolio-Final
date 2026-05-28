(function () {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
})();

if (window.tailwind) {
    window.tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                fontFamily: {
                    serif: ['"Crimson Text"', 'serif'],
                    sans: ['Inter', 'system-ui', 'sans-serif']
                }
            }
        }
    };
    if (typeof window.tailwind.refresh === 'function') window.tailwind.refresh();
}

let photoList = [];
let currentPhotoIndex = 0;

function setThemeLabel(isDark) {
    const label = document.querySelector('.theme-label');
    if (label) label.textContent = isDark ? 'Mode clair' : 'Mode sombre';
}

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
    viewer.classList.remove('hidden');
    viewer.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeImageViewer = function () {
    const viewer = document.getElementById('imageViewer');
    if (!viewer) return;
    viewer.classList.add('hidden');
    viewer.classList.remove('flex');
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
        if (viewer && !viewer.classList.contains('hidden')) {
            if (e.key === 'Escape') window.closeImageViewer();
            else if (e.key === 'ArrowLeft') window.viewerNav(-1);
            else if (e.key === 'ArrowRight') window.viewerNav(1);
        }
    });

    // Theme
    const root = document.documentElement;
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        setThemeLabel(root.classList.contains('dark'));
        themeBtn.addEventListener('click', () => {
            root.classList.add('theme-transitioning');
            root.classList.toggle('dark');
            const isDark = root.classList.contains('dark');
            try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
            setThemeLabel(isDark);
            setTimeout(() => root.classList.remove('theme-transitioning'), 300);
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('right-6');
            navLinks.classList.toggle('top-20');
            mobileMenuBtn.textContent = navLinks.classList.contains('hidden') ? '☰' : '✕';
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navLinks.classList.add('hidden');
                navLinks.classList.remove('flex', 'absolute', 'right-6', 'top-20');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }

    // Scroll to top
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
                scrollTopBtn.classList.add('flex');
            } else {
                scrollTopBtn.classList.add('hidden');
                scrollTopBtn.classList.remove('flex');
            }
        });

        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        scrollTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});
