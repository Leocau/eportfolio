# eportfolio
This is my eportfolio

The main stylesheet is split by category under `styles/`:

- `base.css` contains fonts, color variables, and global defaults.
- `header-footer.css` contains the site navigation and footer.
- `layout.css` contains the main page and section structure.
- `content.css` contains text, image, presentation, timeline, skills, and project styles.
- `forms.css` contains contact form styles.
- `responsive.css` contains mobile-specific rules.

Pages continue to load `style.css`, which imports these files in cascade order.
