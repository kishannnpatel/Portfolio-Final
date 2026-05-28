let currentLang = 'fr';
let currentOpenGallery = null;
let currentViewerImages = [];
let currentViewerIndex = 0;

const translations = {
    fr: {
        'nav.about': 'À propos',
        'nav.skills': 'Compétences',
        'nav.projects': 'Projets',
        'nav.photo': 'Portfolio photo',
        'nav.experience': 'Parcours',
        'nav.contact': 'Contact',
        'hero.kicker': 'Portfolio',
        'hero.title': 'Étudiant en Informatique',
        'hero.subtitle': 'Spécialisé en administration, gestion et exploitation des données',
        'hero.desc': "Je suis étudiant en 2ème année de BUT Informatique à l'IUT de Montreuil. Je m'oriente vers l'administration et la gestion des données (modélisation, bases relationnelles, qualité et organisation).",
        'hero.cta.contact': 'Me contacter',
        'hero.cta.projects': 'Voir les projets',
        'hero.cta.photo': 'Voir le portfolio photo',
        'hero.focus.label': 'Focus',
        'hero.focus.title': 'Administration & données',
        'hero.focus.desc': 'Modélisation, organisation, qualité et cohérence des données.',
        'hero.tech.label': 'Tech',
        'hero.tech.title': 'SQL, PostgreSQL, Python',
        'hero.tech.desc': 'Requêtes, conception de schémas, analyse et traitement des données.',
        'hero.availability.label': 'Stage en cours',
        'hero.availability.title': 'Elementum',
        'hero.availability.desc': 'Customer Experience · GenAI & Agentic AI — Avril – Juin 2026.',
        'about.title': 'À propos',
        'about.study': 'Étudiant en BUT Informatique, je me spécialise en administration, gestion et exploitation des données.',
        'about.interests.label': "Centres d'intérêt",
        'about.interests.desc': "Bénévole dans l'association socio-spirituelle BAPS, je suis aussi débutant en vidéaste et photographe.",
        'about.stage': "Actuellement en stage chez Elementum (avril – juin 2026).",
        'info.location.label': 'Localisation',
        'info.location.value': 'Drancy, France',
        'info.email.label': 'Email',
        'info.phone.label': 'Téléphone',
        'info.languages.label': 'Langues',
        'info.languages.value': 'Français, Anglais, Gujarati, Hindi',
        'skills.title': 'Compétences',
        'skills.languages': 'Langages',
        'skills.databases': 'Bases de données',
        'skills.tools': 'Outils & Environnements',
        'skills.frameworks': 'Frameworks',
        'projects.title': 'Projets',
        'projects.buvette.category': 'Développement web',
        'projects.buvette.desc': 'Plateforme complète de gestion pour une buvette avec système de stocks, gestion des commandes et authentification utilisateurs. Architecture robuste en PHP/MySQL.',
        'projects.bataille.category': 'Développement de jeux',
        'projects.bataille.desc': 'Jeu de Bataille Navale en Java sur terminal : placement des bateaux, tour par tour et gestion des tirs.',
        'projects.terraria.category': 'Développement de jeux',
        'projects.terraria.desc': "Jeu 2D complet développé en JavaFX avec système de combat avancé, exploration dynamique et gestion d'entités complexes.",
        'projects.zelda.category': 'Développement de jeux',
        'projects.zelda.desc': "Jeu d'aventure 2D inspiré de Zelda, développé en JavaFX : exploration de donjon, combats et collecte d'objets.",
        'projects.puissance.category': 'Algorithmes & IA',
        'projects.puissance.desc': "Implémentation de Puissance 4 avec algorithmes d'IA avancés et optimisation des performances.",
        'projects.asterix.category': 'Conception de base de données',
        'projects.asterix.desc': 'Modélisation de données relationnelles complexes avec requêtes SQL avancées et optimisation des performances.',
        'projects.view.photos': 'Voir les photos',
        'experience.title': 'Parcours',
        'experience.education.label': 'Formation',
        'experience.education.but': 'BUT Informatique',
        'experience.education.bac': 'Baccalauréat Technologique',
        'experience.work.label': 'Expérience',
        'experience.work.intern': 'Stagiaire',
        'experience.work.intern.status': 'En cours',
        'experience.work.intern.desc': 'Customer Experience · GenAI & Agentic AI',
        'experience.work.intern.supervisor': 'Encadré par un Solution Architect',
        'experience.work.assistant': 'Assistant du Gérant',
        'experience.work.receptionist': 'Réceptionniste',
        'contact.title': 'Prêt à travailler ensemble ?',
        'contact.desc': 'Vous avez un projet intéressant ou une opportunité ? Je serais ravi de discuter de comment je pourrais contribuer.',
        'contact.cv.label': 'Télécharger mon CV',
        'contact.cv.fr': 'CV Français',
        'contact.cv.en': 'CV Anglais',
        'footer.copy': '© 2026 Kishan Patel - Tous droits réservés',
        'gallery.empty': 'Aucune image disponible pour ce projet.',
    },
    en: {
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.photo': 'Photo portfolio',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'hero.kicker': 'Portfolio',
        'hero.title': 'Computer Science Student',
        'hero.subtitle': 'Specializing in data administration, management, and operations',
        'hero.desc': "I'm a 2nd-year Bachelor of Technology in Computer Science (BUT Informatique) student at IUT de Montreuil. I focus on data administration and management (data modeling, relational databases, data quality, and organization).",
        'hero.cta.contact': 'Contact me',
        'hero.cta.projects': 'View projects',
        'hero.cta.photo': 'View photo portfolio',
        'hero.focus.label': 'Focus',
        'hero.focus.title': 'Data administration & management',
        'hero.focus.desc': 'Data modeling, organization, quality, and consistency.',
        'hero.tech.label': 'Tech',
        'hero.tech.title': 'SQL, PostgreSQL, Python',
        'hero.tech.desc': 'SQL queries, schema design, analysis, and data processing.',
        'hero.availability.label': 'Internship',
        'hero.availability.title': 'Elementum',
        'hero.availability.desc': 'Customer Experience · GenAI & Agentic AI — April – June 2026.',
        'about.title': 'About',
        'about.study': 'Bachelor of Technology in Computer Science (BUT Informatique) student specializing in data administration, management, and operations.',
        'about.interests.label': 'Interests',
        'about.interests.desc': 'Volunteer in the BAPS socio-spiritual association; beginner videographer and photographer.',
        'about.stage': 'Currently interning at Elementum (April – June 2026).',
        'info.location.label': 'Location',
        'info.location.value': 'Drancy, France',
        'info.email.label': 'Email',
        'info.phone.label': 'Phone',
        'info.languages.label': 'Languages',
        'info.languages.value': 'French, English, Gujarati, Hindi',
        'skills.title': 'Skills',
        'skills.languages': 'Languages',
        'skills.databases': 'Databases',
        'skills.tools': 'Tools & Environments',
        'skills.frameworks': 'Frameworks',
        'projects.title': 'Projects',
        'projects.buvette.category': 'Web Development',
        'projects.buvette.desc': 'Complete management platform for a snack bar with stock tracking, order management, and user authentication. Robust PHP/MySQL architecture.',
        'projects.bataille.category': 'Game Development',
        'projects.bataille.desc': 'Terminal-based Battleship game in Java with ship placement, turn-based play, and shot management.',
        'projects.terraria.category': 'Game Development',
        'projects.terraria.desc': 'Full 2D game built in JavaFX with advanced combat, dynamic exploration, and complex entity management.',
        'projects.zelda.category': 'Game Development',
        'projects.zelda.desc': '2D adventure game inspired by Zelda, built in JavaFX: dungeon exploration, combat, and item collection.',
        'projects.puissance.category': 'Algorithms & AI',
        'projects.puissance.desc': 'Connect Four implementation with AI algorithms and performance optimizations.',
        'projects.asterix.category': 'Database Design',
        'projects.asterix.desc': 'Relational data modeling with advanced SQL queries and performance optimization.',
        'projects.view.photos': 'View photos',
        'experience.title': 'Experience',
        'experience.education.label': 'Education',
        'experience.education.but': 'Bachelor of Technology in Computer Science (BUT Informatique)',
        'experience.education.bac': 'Technological Baccalaureate',
        'experience.work.label': 'Experience',
        'experience.work.intern': 'Intern',
        'experience.work.intern.status': 'Ongoing',
        'experience.work.intern.desc': 'Customer Experience · GenAI & Agentic AI',
        'experience.work.intern.supervisor': 'Supervised by a Solution Architect',
        'experience.work.assistant': 'Assistant Manager',
        'experience.work.receptionist': 'Receptionist',
        'contact.title': 'Ready to work together?',
        'contact.desc': "Do you have an interesting project or an opportunity? I'd be happy to discuss how I can contribute.",
        'contact.cv.label': 'Download my CV',
        'contact.cv.fr': 'French CV',
        'contact.cv.en': 'English CV',
        'footer.copy': '© 2026 Kishan Patel - All rights reserved',
        'gallery.empty': 'No images available for this project.',
    }
};

const themeLabels = {
    fr: { dark: 'Mode sombre', light: 'Mode clair' },
    en: { dark: 'Dark mode', light: 'Light mode' }
};

document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) return;
    const langBtn = document.getElementById('langBtn');

    // Basic copy/paste deterrent
    document.body.classList.add('no-copy');
    document.addEventListener('contextmenu', (e) => {
        if (e.target && e.target.closest && e.target.closest('[data-allow-copy="true"]')) return;
        e.preventDefault();
    });

    const isCopyAllowed = () => {
        const selection = window.getSelection && window.getSelection();
        if (selection && selection.toString()) {
            const anchor = selection.anchorNode && selection.anchorNode.parentElement;
            if (anchor && anchor.closest('[data-allow-copy="true"]')) return true;
        }
        const active = document.activeElement;
        if (active && active.closest('[data-allow-copy="true"]')) return true;
        return false;
    };

    document.addEventListener('copy', (e) => { if (!isCopyAllowed()) e.preventDefault(); });
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u', 'p'].includes(e.key.toLowerCase())) {
            if (isCopyAllowed()) return;
            e.preventDefault();
        }
    });

    const themeLabel = themeBtn.querySelector('.theme-label');
    const langLabel = langBtn ? langBtn.querySelector('.lang-label') : null;
    const root = document.documentElement;

    const updateThemeLabel = () => {
        if (!themeLabel) return;
        const labels = themeLabels[currentLang] || themeLabels.fr;
        themeLabel.textContent = root.classList.contains('dark') ? labels.light : labels.dark;
    };

    const updateLangLabel = () => {
        if (!langLabel) return;
        langLabel.textContent = currentLang === 'fr' ? 'English' : 'Français';
    };

    const applyTranslations = (lang) => {
        currentLang = lang;
        root.setAttribute('lang', lang);
        const dict = translations[lang] || translations.fr;
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
                el.textContent = dict[key];
            }
        });
        updateThemeLabel();
        updateLangLabel();
    };

    // Initialize theme
    let storedTheme = null;
    try { storedTheme = localStorage.getItem('theme'); } catch (e) {}
    if (storedTheme === 'dark') root.classList.add('dark');

    // Initialize language
    let storedLang = null;
    try { storedLang = localStorage.getItem('lang'); } catch (e) {}
    const browserLang = (navigator.language || '').toLowerCase();
    const initialLang = storedLang || (browserLang.startsWith('fr') ? 'fr' : 'en');
    applyTranslations(initialLang);

    themeBtn.addEventListener('click', () => {
        root.classList.add('theme-transitioning');
        root.classList.toggle('dark');
        const isDark = root.classList.contains('dark');
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
        updateThemeLabel();
        setTimeout(() => root.classList.remove('theme-transitioning'), 300);
    });

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'fr' ? 'en' : 'fr';
            try { localStorage.setItem('lang', nextLang); } catch (e) {}
            applyTranslations(nextLang);
        });
    }

    // Mobile menu
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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    navLinks.classList.add('hidden');
                    navLinks.classList.remove('flex', 'absolute', 'right-6', 'top-20');
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinks.classList.add('hidden');
            navLinks.classList.remove('flex', 'absolute', 'right-6', 'top-20');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Scroll to top
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('hidden');
            scrollTopBtn.classList.add('flex');
        } else {
            scrollTopBtn.classList.add('hidden');
            scrollTopBtn.classList.remove('flex');
        }
        updateActiveNav();
    });

    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    scrollTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Lazy load fallback
    if (!('loading' in HTMLImageElement.prototype)) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    initScrollReveal();
    updateActiveNav();
});

// Active nav section tracking
function updateActiveNav() {
    const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
    const navAnchors = document.querySelectorAll('nav a[href^="#"]');
    let activeHref = '';
    const offset = 120;

    for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
            activeHref = '#' + id;
        }
    }

    navAnchors.forEach(a => {
        if (a.getAttribute('href') === activeHref) {
            a.classList.add('nav-active');
        } else {
            a.classList.remove('nav-active');
        }
    });
}

// Scroll reveal
function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (!window.IntersectionObserver) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => entry.target.classList.add('is-visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(el => observer.observe(el));
}

// Project galleries
const projectGalleries = {
    buvette: {
        title: { fr: 'Buvette Associative', en: 'Community Snack Bar' },
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
    bataille: {
        title: { fr: 'Bataille-Navale', en: 'Battleship' },
        images: [
            'images/Projets/BatailleNavale/bataille-01.png',
            'images/Projets/BatailleNavale/bataille-02.png',
            'images/Projets/BatailleNavale/bataille-03.png'
        ]
    },
    terraria: {
        title: { fr: 'Terraria-Like', en: 'Terraria-Like' },
        images: []
    },
    zelda: {
        title: { fr: 'Zelda', en: 'Zelda' },
        images: []
    },
    jeux: {
        title: { fr: 'Jeux de Stratégie', en: 'Strategy Games' },
        images: []
    },
    asterix: {
        title: { fr: 'Parc Astérix', en: 'Parc Astérix' },
        images: []
    }
};

function openGallery(projectId) {
    const modal = document.getElementById('galleryModal');
    const titleEl = document.getElementById('galleryTitle');
    const grid = document.getElementById('galleryGrid');
    const gallery = projectGalleries[projectId];

    if (!gallery) {
        console.error('Gallery not found:', projectId);
        return;
    }

    currentOpenGallery = projectId;
    const titleText = typeof gallery.title === 'string'
        ? gallery.title
        : (gallery.title[currentLang] || gallery.title.fr);

    titleEl.textContent = titleText;
    grid.innerHTML = '';

    if (!gallery.images.length) {
        const dict = translations[currentLang] || translations.fr;
        grid.className = 'mt-6';
        const empty = document.createElement('p');
        empty.className = 'py-16 text-center text-stone-500 dark:text-stone-400';
        empty.textContent = dict['gallery.empty'] || 'Aucune image disponible.';
        grid.appendChild(empty);
    } else {
        grid.className = 'mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3';
        gallery.images.forEach((imageSrc, index) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-950';
            btn.onclick = () => openImageViewer(imageSrc, titleText + ' – ' + (index + 1), index);

            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = titleText + ' – ' + (index + 1);
            img.loading = 'lazy';
            img.className = 'h-60 w-full object-cover transition duration-300 group-hover:scale-105';
            img.onerror = function () {
                this.style.display = 'none';
                const ph = document.createElement('div');
                ph.className = 'flex h-60 items-center justify-center bg-stone-100 text-stone-400 dark:bg-stone-900';
                ph.innerHTML = '<svg class="h-12 w-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';
                this.parentElement.appendChild(ph);
            };

            btn.appendChild(img);
            grid.appendChild(btn);
        });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    currentOpenGallery = null;
}

function closeGalleryOnBackdrop(event) {
    if (event.target.id === 'galleryModal') closeGallery();
}

function openImageViewer(imageSrc, altText, index) {
    const viewer = document.getElementById('imageViewer');
    const img = document.getElementById('viewerImage');

    if (currentOpenGallery && projectGalleries[currentOpenGallery] && projectGalleries[currentOpenGallery].images.length) {
        currentViewerImages = projectGalleries[currentOpenGallery].images;
        currentViewerIndex = (index !== undefined) ? index : Math.max(0, currentViewerImages.indexOf(imageSrc));
    } else {
        currentViewerImages = [imageSrc];
        currentViewerIndex = 0;
    }

    if (img) { img.src = imageSrc; img.alt = altText || ''; }
    updateViewerUI();
    viewer.classList.remove('hidden');
    viewer.classList.add('flex');
}

function updateViewerUI() {
    const img = document.getElementById('viewerImage');
    const counter = document.getElementById('viewerCounter');
    const prevBtn = document.getElementById('viewerPrev');
    const nextBtn = document.getElementById('viewerNext');
    const src = currentViewerImages[currentViewerIndex];

    if (img && src) img.src = src;
    if (counter) {
        counter.textContent = currentViewerImages.length > 1
            ? (currentViewerIndex + 1) + ' / ' + currentViewerImages.length
            : '';
    }
    const multi = currentViewerImages.length > 1;
    if (prevBtn) prevBtn.style.display = multi ? '' : 'none';
    if (nextBtn) nextBtn.style.display = multi ? '' : 'none';
}

function viewerNav(direction) {
    if (!currentViewerImages.length) return;
    currentViewerIndex = (currentViewerIndex + direction + currentViewerImages.length) % currentViewerImages.length;
    updateViewerUI();
}

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
    } else if (!viewer.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') viewerNav(-1);
        else if (e.key === 'ArrowRight') viewerNav(1);
    }
});
