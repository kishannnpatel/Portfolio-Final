// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {

    // Theme Toggle
    const themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) {
        return;
    }

    // Basic copy/paste deterrent (not secure)
    document.body.classList.add('no-copy');
    document.addEventListener('contextmenu', (e) => {
        if (e.target && e.target.closest && e.target.closest('[data-allow-copy="true"]')) {
            return;
        }
        e.preventDefault();
    });

    const isCopyAllowed = () => {
        const selection = window.getSelection && window.getSelection();
        if (selection && selection.toString()) {
            const anchor = selection.anchorNode && selection.anchorNode.parentElement;
            if (anchor && anchor.closest('[data-allow-copy=\"true\"]')) {
                return true;
            }
        }
        const active = document.activeElement;
        if (active && active.closest('[data-allow-copy=\"true\"]')) {
            return true;
        }
        return false;
    };

    document.addEventListener('copy', (e) => {
        if (isCopyAllowed()) {
            return;
        }
        e.preventDefault();
    });
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u', 'p'].includes(e.key.toLowerCase())) {
            if (isCopyAllowed()) {
                return;
            }
            e.preventDefault();
        }
    });

    const themeLabel = themeBtn.querySelector('.theme-label');
    const root = document.documentElement;

    // Initialize theme from localStorage
    let storedTheme = null;
    try {
        storedTheme = localStorage.getItem('theme');
    } catch (e) {
        storedTheme = null;
    }

    if (storedTheme === 'dark') {
        root.classList.add('dark');
        if (themeLabel) {
            themeLabel.textContent = 'Mode clair';
        }
    }

    themeBtn.addEventListener('click', () => {
        root.classList.toggle('dark');
        const isDark = root.classList.contains('dark');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            // Ignore storage errors.
        }
        if (themeLabel) {
            themeLabel.textContent = isDark ? 'Mode clair' : 'Mode sombre';
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('right-6');
        navLinks.classList.toggle('top-20');
        mobileMenuBtn.textContent = navLinks.classList.contains('hidden') ? '☰' : '✕';
    });

    // Smooth scrolling for anchor links
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
                    // Close mobile menu if open
                    navLinks.classList.add('hidden');
                    navLinks.classList.remove('flex', 'absolute', 'right-6', 'top-20');
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinks.classList.add('hidden');
            navLinks.classList.remove('flex', 'absolute', 'right-6', 'top-20');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');

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

    // Accessibility: Allow keyboard navigation for scroll to top
    scrollTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Performance: Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

});

// Gallery Data - REMPLACEZ PAR VOS VRAIES IMAGES
const projectGalleries = {
    buvette: {
        title: 'Buvette Associative',
        images: [
            'images/Projets/Buvettes-Images/accueil.png',
            'images/Projets/Buvettes-Images/connexion.png',
            'images/Projets/Buvettes-Images/inscription.png',
            'images/Projets/Buvettes-Images/admin/admin_accueil.png',
            'images/Projets/Buvettes-Images/admin/admin_demande.png',
            'images/Projets/Buvettes-Images/admin/admin_newAsso.png',
            'images/Projets/Buvettes-Images/client/asso_accueil.png',
            'images/Projets/Buvettes-Images/client/client_accueil.png',
            'images/Projets/Buvettes-Images/client/code.png',
            'images/Projets/Buvettes-Images/client/cree_asso.png',
            'images/Projets/Buvettes-Images/client/historique.png',
            'images/Projets/Buvettes-Images/client/panier.png',
            'images/Projets/Buvettes-Images/client/produit.png',

        ]
    },
    zelda: {
        title: 'Zelda & Terraria-Like',
        images: [
            'assets/projects/zelda/1.svg',
            'assets/projects/zelda/2.svg',
            'assets/projects/zelda/3.svg',
            'assets/projects/zelda/4.svg'
        ]
    },
    jeux: {
        title: 'Jeux de Stratégie',
        images: [
            'assets/projects/jeux/1.svg',
            'assets/projects/jeux/2.svg',
            'assets/projects/jeux/3.svg'
        ]
    },
    asterix: {
        title: 'Parc Astérix',
        images: [
            'assets/projects/asterix/1.svg',
            'assets/projects/asterix/2.svg',
            'assets/projects/asterix/3.svg',
            'assets/projects/asterix/4.svg'
        ]
    }
};

// Open Gallery Function
function openGallery(projectId) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const grid = document.getElementById('galleryGrid');

    const gallery = projectGalleries[projectId];

    if (!gallery) {
        console.error('Gallery not found for project:', projectId);
        return;
    }

    // Set title
    title.textContent = gallery.title;

    // Clear and populate grid
    grid.innerHTML = '';
    gallery.images.forEach((imageSrc, index) => {
        const imgContainer = document.createElement('button');
        imgContainer.type = 'button';
        imgContainer.className = 'group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-950';
        imgContainer.onclick = () => openImageViewer(imageSrc, `${gallery.title} - Image ${index + 1}`);

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${gallery.title} - Image ${index + 1}`;
        img.loading = 'lazy';
        img.className = 'h-60 w-full object-cover transition duration-300 group-hover:scale-105';

        imgContainer.appendChild(img);
        grid.appendChild(imgContainer);
    });

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Close Gallery Function
function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Close gallery when clicking on backdrop
function closeGalleryOnBackdrop(event) {
    if (event.target.id === 'galleryModal') {
        closeGallery();
    }
}

// Open Image Viewer (fullscreen)
function openImageViewer(imageSrc, altText) {
    const viewer = document.getElementById('imageViewer');
    const img = document.getElementById('viewerImage');

    img.src = imageSrc;
    img.alt = altText;
    viewer.classList.remove('hidden');
    viewer.classList.add('flex');
}

// Close Image Viewer
function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    viewer.classList.add('hidden');
    viewer.classList.remove('flex');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    const viewer = document.getElementById('imageViewer');

    if (e.key === 'Escape') {
        if (!viewer.classList.contains('hidden')) {
            closeImageViewer();
        } else if (!modal.classList.contains('hidden')) {
            closeGallery();
        }
    }
});
