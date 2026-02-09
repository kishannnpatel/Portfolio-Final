let currentLang = 'fr';

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
        'hero.desc': "J e suis un étudiant en 2ème année de BUT Informatique à l'IUT de Montreuil. Je m’oriente vers l’administration et la gestion des données (modélisation, bases relationnelles, qualité et organisation).",
        'hero.cta.contact': 'Me contacter',
        'hero.cta.projects': 'Voir les projets',
        'hero.cta.photo': 'Voir le portfolio photo',
        'hero.focus.label': 'Focus',
        'hero.focus.title': 'Administration & données',
        'hero.focus.desc': 'Modélisation, organisation, qualité et cohérence des données.',
        'hero.tech.label': 'Tech',
        'hero.tech.title': 'SQL, PostgreSQL, Python',
        'hero.tech.desc': 'Requêtes, conception de schémas, analyse et traitement des données.',
        'hero.availability.label': 'Disponibilité',
        'hero.availability.title': 'Stage avril-juin 2026',
        'hero.availability.desc': 'Du 13 avril au 19 juin 2026, temps plein.',
        'about.title': 'À propos',
        'about.study': 'Étudiant en BUT Informatique, je me spécialise en administration, gestion et exploitation des données.',
        'about.interests.label': 'Centres d’intérêt',
        'about.interests.desc': 'Bénévole dans l’association socio-spirituelle BAPS, je suis aussi débutant en vidéaste et photographe.',
        'about.stage': "Actuellement à la recherche d'un stage du 13 avril au 19 juin 2026.",
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
        'projects.bataille.desc': 'Jeu de Bataille Navale en Java sur terminal : placement des bateaux, tour par tour et gestion des tirs.',
        'projects.terraria.category': 'Développement de jeux',
        'projects.terraria.desc': "Jeu 2D complet développé en JavaFX avec système de combat avancé, exploration dynamique et gestion d'entités complexes.",
        'projects.zelda.category': 'Développement de jeux',
        'projects.zelda.desc': "Jeu 2D complet développé en JavaFX avec système de combat avancé, exploration dynamique et gestion d'entités complexes.",
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
        'experience.work.assistant': 'Assistant du Gérant',
        'experience.work.receptionist': 'Réceptionniste',
        'contact.title': 'Prêt à travailler ensemble ?',
        'contact.desc': 'Vous avez un projet intéressant ou une opportunité ? Je serais ravi de discuter de comment je pourrais contribuer.',
        'contact.cv.label': 'Télécharger mon CV',
        'contact.cv.fr': 'CV Français',
        'contact.cv.en': 'CV Anglais',
        'footer.copy': '© 2026 Kishan Patel - Tous droits réservés'
    },
    en: {
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.photo': 'Photo portfolio',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'hero.kicker': 'Portfolio',
        'hero.title': 'Computer Science student',
        'hero.subtitle': 'Specialized in data administration and management',
        'hero.desc': 'I’m not a developer: I’m a 2nd-year BUT Informatique student at IUT de Montreuil. I focus on data administration and management (modeling, relational databases, quality, and organization).',
        'hero.cta.contact': 'Contact me',
        'hero.cta.projects': 'View projects',
        'hero.cta.photo': 'View photo portfolio',
        'hero.focus.label': 'Focus',
        'hero.focus.title': 'Data administration',
        'hero.focus.desc': 'Modeling, organization, data quality, and consistency.',
        'hero.tech.label': 'Tech',
        'hero.tech.title': 'SQL, PostgreSQL, Python',
        'hero.tech.desc': 'Queries, schema design, analysis, and data processing.',
        'hero.availability.label': 'Availability',
        'hero.availability.title': 'Internship Apr-Jun 2026',
        'hero.availability.desc': 'April 13 to June 19, 2026, full-time.',
        'about.title': 'About',
        'about.study': 'BUT Informatique student specializing in data administration, management, and operations.',
        'about.interests.label': 'Interests',
        'about.interests.desc': 'Volunteer in the BAPS socio-spiritual association; beginner videographer and photographer.',
        'about.stage': 'Currently looking for an internship from April 13 to June 19, 2026.',
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
        'projects.buvette.desc': 'Complete management platform for a snack bar with stock system, order management, and user authentication. Robust PHP/MySQL architecture.',
        'projects.bataille.category': 'Game Development',
        'projects.bataille.desc': 'Terminal-based Battleship game in Java: ship placement, turn-based play, and shot management.',
        'projects.terraria.category': 'Game Development',
        'projects.terraria.desc': 'Full 2D game built in JavaFX with advanced combat, dynamic exploration, and complex entity management.',
        'projects.zelda.category': 'Game Development',
        'projects.zelda.desc': 'Full 2D game built in JavaFX with advanced combat, dynamic exploration, and complex entity management.',
        'projects.puissance.category': 'Algorithms & AI',
        'projects.puissance.desc': 'Connect Four implementation with AI algorithms and performance optimizations.',
        'projects.asterix.category': 'Database Design',
        'projects.asterix.desc': 'Relational data modeling with advanced SQL queries and performance optimization.',
        'projects.view.photos': 'View photos',
        'experience.title': 'Experience',
        'experience.education.label': 'Education',
        'experience.education.but': 'BUT Informatique',
        'experience.education.bac': 'Technological Baccalaureate',
        'experience.work.label': 'Experience',
        'experience.work.assistant': 'Assistant Manager',
        'experience.work.receptionist': 'Receptionist',
        'contact.title': 'Ready to work together?',
        'contact.desc': 'Do you have an interesting project or an opportunity? I’d be happy to discuss how I could contribute.',
        'contact.cv.label': 'Download my CV',
        'contact.cv.fr': 'French CV',
        'contact.cv.en': 'English CV',
        'footer.copy': '© 2026 Kishan Patel - All rights reserved'
    }
};

const themeLabels = {
    fr: { dark: 'Mode sombre', light: 'Mode clair' },
    en: { dark: 'Dark mode', light: 'Light mode' }
};

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {

    // Theme & language toggle
    const themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) {
        return;
    }
    const langBtn = document.getElementById('langBtn');

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
    const langLabel = langBtn ? langBtn.querySelector('.lang-label') : null;
    const root = document.documentElement;

    const updateThemeLabel = () => {
        if (!themeLabel) {
            return;
        }
        const labels = themeLabels[currentLang] || themeLabels.fr;
        const isDark = root.classList.contains('dark');
        themeLabel.textContent = isDark ? labels.light : labels.dark;
    };

    const updateLangLabel = () => {
        if (!langLabel) {
            return;
        }
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

    // Initialize theme from localStorage
    let storedTheme = null;
    try {
        storedTheme = localStorage.getItem('theme');
    } catch (e) {
        storedTheme = null;
    }

    if (storedTheme === 'dark') {
        root.classList.add('dark');
    }

    // Initialize language from localStorage or browser preference
    let storedLang = null;
    try {
        storedLang = localStorage.getItem('lang');
    } catch (e) {
        storedLang = null;
    }
    const browserLang = (navigator.language || '').toLowerCase();
    const initialLang = storedLang || (browserLang.startsWith('fr') ? 'fr' : 'en');
    applyTranslations(initialLang);

    themeBtn.addEventListener('click', () => {
        root.classList.toggle('dark');
        const isDark = root.classList.contains('dark');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            // Ignore storage errors.
        }
        updateThemeLabel();
    });

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'fr' ? 'en' : 'fr';
            try {
                localStorage.setItem('lang', nextLang);
            } catch (e) {
                // Ignore storage errors.
            }
            applyTranslations(nextLang);
        });
    }

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

const projectGalleries = {
    buvette: {
        title: {
            fr: 'Buvette Associative',
            en: 'Community Snack Bar'
        },
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

     bataillenavale: {
        title: {
            fr: 'Zelda & Terraria-Like',
            en: 'Zelda & Terraria-Like'
        },
        images: [
            'assets/projects/zelda/1.svg',
            'assets/projects/zelda/2.svg',
            'assets/projects/zelda/3.svg',
            'assets/projects/zelda/4.svg'
        ]
    },
    zelda: {
        title: {
            fr: 'Zelda & Terraria-Like',
            en: 'Zelda & Terraria-Like'
        },
        images: [
            'assets/projects/zelda/1.svg',
            'assets/projects/zelda/2.svg',
            'assets/projects/zelda/3.svg',
            'assets/projects/zelda/4.svg'
        ]
    },
    jeux: {
        title: {
            fr: 'Jeux de Stratégie',
            en: 'Strategy Games'
        },
        images: [
            'assets/projects/jeux/1.svg',
            'assets/projects/jeux/2.svg',
            'assets/projects/jeux/3.svg'
        ]
    },
    asterix: {
        title: {
            fr: 'Parc Astérix',
            en: 'Parc Astérix'
        },
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

    const titleText = typeof gallery.title === 'string'
        ? gallery.title
        : (gallery.title && (gallery.title[currentLang] || gallery.title.fr)) || '';

    // Set title
    title.textContent = titleText;

    // Clear and populate grid
    grid.innerHTML = '';
    gallery.images.forEach((imageSrc, index) => {
        const imgContainer = document.createElement('button');
        imgContainer.type = 'button';
        imgContainer.className = 'group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-950';
        imgContainer.onclick = () => openImageViewer(imageSrc, `${titleText} - Image ${index + 1}`);

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${titleText} - Image ${index + 1}`;
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
