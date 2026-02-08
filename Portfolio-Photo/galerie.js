(function () {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    } catch (e) {
        // Ignore storage errors.
    }
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
    if (typeof window.tailwind.refresh === 'function') {
        window.tailwind.refresh();
    }
}

function setThemeLabel(isDark) {
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) {
        themeLabel.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    }
}

window.openImageViewer = function (imageSrc, altText) {
    const viewer = document.getElementById('imageViewer');
    const img = document.getElementById('viewerImage');
    if (!viewer || !img) {
        return;
    }
    img.src = imageSrc;
    img.alt = altText || '';
    viewer.classList.remove('hidden');
    viewer.classList.add('flex');
};

window.closeImageViewer = function () {
    const viewer = document.getElementById('imageViewer');
    if (!viewer) {
        return;
    }
    viewer.classList.add('hidden');
    viewer.classList.remove('flex');
};

document.addEventListener('DOMContentLoaded', function () {
    // Basic copy/paste deterrent (not secure)
    document.body.classList.add('no-copy');
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u', 'p'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
        if (e.key === 'Escape') {
            window.closeImageViewer();
        }
    });

    const root = document.documentElement;
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        setThemeLabel(root.classList.contains('dark'));
        themeBtn.addEventListener('click', () => {
            root.classList.toggle('dark');
            const isDark = root.classList.contains('dark');
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (e) {
                // Ignore storage errors.
            }
            setThemeLabel(isDark);
        });
    }

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.remove('hidden');
                scrollTopBtn.classList.add('flex');
            } else {
                scrollTopBtn.classList.add('hidden');
                scrollTopBtn.classList.remove('flex');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});
