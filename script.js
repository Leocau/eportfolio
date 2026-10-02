document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuButton && navLinks) {
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
