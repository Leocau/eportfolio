document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    const pageSections = {
        'welcome.html': [
            { id: 'presentation', label: { fr: 'Présentation', en: 'Introduction' } },
            { id: 'a-propos', label: { fr: 'À découvrir', en: 'Explore' } },
            { id: 'a-propos-site', label: { fr: 'À propos de ce site', en: 'About This Site' } }
        ],
        'engineering.html': [
            { id: 'engineering-projects-title', label: { fr: 'Projets', en: 'Projects' } },
            { id: 'engineering-courses-title', label: { fr: 'Vœux d\'option', en: 'Option Choices' } }
        ],
        'international_mobility.html': [
            { id: 'mobility-intro-title', label: { fr: 'Projets de mobilité', en: 'Mobility Projects' } },
            {
                id: { fr: 'mobility-lv2-title', en: 'mobility-languages-title' },
                label: { fr: 'Langues parlées', en: 'Languages Spoken' }
            },
            { id: 'mobility-title', label: { fr: 'Expériences internationales', en: 'International Experiences' } }
        ],
        'civic_engagements.html': [
            { id: 'civic-engagements-title', label: { fr: 'Mes engagements', en: 'My Engagements' } }
        ],
        'sports_and_other_activities.html': [
            { id: 'activities-title', label: { fr: 'Activités', en: 'Activities' } }
        ],
        'professional_development.html': [
            { id: 'resume-title', label: { fr: 'Mon CV', en: 'My Resume' } },
            { id: 'pitch-title', label: { fr: 'Mon pitch vidéo', en: 'My Video Pitch' } }
        ],
        'contact.html': [
            { id: 'contact', label: { fr: 'Contact', en: 'Contact' } }
        ]
    };

    if (menuButton && navLinks) {
        navLinks.querySelectorAll(':scope > li > a').forEach((pageLink) => {
            const page = pageLink.getAttribute('href').split('#')[0];
            const sections = pageSections[page];

            if (!sections) {
                return;
            }

            const submenu = document.createElement('ul');
            submenu.className = 'nav-submenu';
            submenu.setAttribute('aria-label', language === 'fr' ? 'Sections de la page' : 'Page sections');
            pageLink.parentElement.classList.add('has-submenu');

            sections.forEach((section) => {
                const sectionId = typeof section.id === 'string' ? section.id : section.id[language];
                const item = document.createElement('li');
                const sectionLink = document.createElement('a');
                sectionLink.href = `${page}#${sectionId}`;
                sectionLink.textContent = section.label[language];
                item.append(sectionLink);
                submenu.append(item);
            });

            pageLink.parentElement.append(submenu);
        });

        const setMenuOpen = (isOpen) => {
            menuButton.classList.toggle('active', isOpen);
            navLinks.classList.toggle('active', isOpen);
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute(
                'aria-label',
                isOpen
                    ? (document.documentElement.lang === 'fr' ? 'Fermer le menu' : 'Close navigation menu')
                    : (document.documentElement.lang === 'fr' ? 'Ouvrir le menu' : 'Open navigation menu')
            );
        };

        menuButton.addEventListener('click', () => {
            setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        });
    }

    const langSelect = document.getElementById('langSwitcher');

    if (langSelect) {
        const currentPath = window.location.pathname;
        const currentLang = currentPath.includes('/en/') ? 'en' : 'fr';
        langSelect.value = currentLang;

        langSelect.addEventListener('change', function () {
            const targetLang = this.value;
            const targetPath = currentPath.includes('/en/')
                ? currentPath.replace(/\/en\//, '/fr/')
                : currentPath.replace(/\/fr\//, '/en/');

            if ((targetLang === 'en' && currentLang === 'fr') || (targetLang === 'fr' && currentLang === 'en')) {
                window.location.href = targetPath;
            }
        });
    }

    const footerLinks = document.querySelector('footer > div');

    if (footerLinks) {
        footerLinks.classList.add('footer-links');

        const createContactLink = (href, label, iconPaths) => {
            const link = document.createElement('a');
            link.className = 'footer-contact-link';
            link.href = href;

            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('width', '18');
            icon.setAttribute('height', '18');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '1.8');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('aria-hidden', 'true');
            icon.setAttribute('focusable', 'false');

            iconPaths.forEach((pathData) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData);
                icon.append(path);
            });

            link.append(icon, document.createTextNode(label));
            return link;
        };

        footerLinks.append(
            createContactLink(
                'tel:+33640333020',
                '+33 6 40 33 30 20',
                ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.72 2.04z']
            ),
            createContactLink(
                'mailto:lcauet22@gmail.com',
                'lcauet22@gmail.com',
                ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6']
            ),
            createContactLink(
                'mailto:leo.cauet@etu.inp-n7.fr',
                'leo.cauet@etu.inp-n7.fr',
                ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6']
            )
        );
    }

    const contactForms = document.querySelectorAll('[data-contact-form]');

    contactForms.forEach((form) => {
        form.addEventListener('submit', async (event) => {
            const status = document.getElementById('form-status') || document.createElement('p');
            status.id = 'form-status';
            status.className = 'form-status';

            const nameField = form.querySelector('[name="nom"]');
            const emailField = form.querySelector('[name="email"]');
            const subjectField = form.querySelector('[name="sujet"]');
            const messageField = form.querySelector('[name="message"]');

            const name = nameField ? nameField.value.trim() : '';
            const senderEmail = emailField ? emailField.value.trim() : '';
            const subject = subjectField ? subjectField.value.trim() : 'Portfolio contact';
            const message = messageField ? messageField.value.trim() : '';

            if (!name || !senderEmail || !subject || !message) {
                event.preventDefault();
                status.textContent = 'Please complete all fields before sending your message.';
                if (!document.getElementById('form-status')) {
                    form.insertAdjacentElement('afterend', status);
                }
                return;
            }

            const isFileProtocol = window.location.protocol === 'file:';

            if (isFileProtocol) {
                status.textContent = 'Submitting to the email service...';
                if (!document.getElementById('form-status')) {
                    form.insertAdjacentElement('afterend', status);
                }
                return;
            }

            event.preventDefault();
            status.textContent = 'Sending your message...';
            if (!document.getElementById('form-status')) {
                form.insertAdjacentElement('afterend', status);
            }

            const payload = {
                name: name,
                email: senderEmail,
                message: message,
                subject: subject,
                _captcha: 'false',
                _template: 'table',
                _subject: subject
            };

            try {
                const response = await fetch('https://formsubmit.co/ajax/lcauet22@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                let result = null;
                try {
                    result = await response.json();
                } catch (jsonError) {
                    result = null;
                }

                if (!response.ok || (result && result.success === false)) {
                    throw new Error('FormSubmit request failed');
                }

                status.textContent = 'Your message has been sent successfully.';
                form.reset();
            } catch (error) {
                const mailtoLink = `mailto:lcauet22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Nom: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
                )}`;

                status.textContent = 'The email service is temporarily unavailable. Your email app has been opened so you can send the message manually.';
                window.location.href = mailtoLink;
            }
        });
    });
});
