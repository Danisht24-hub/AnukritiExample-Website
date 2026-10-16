# Anukriti 2026 – Frontend

    frontend/
    ├── index.html           home: hero, about + details summary, register call-to-action
    ├── about.html
    ├── event-details.html   date, venue, schedule, dress code
    ├── gallery.html         photo/video filter
    ├── contact.html         FAQ accordion + contact details
    ├── register.html        registration form
    ├── css/styles.css       all styling (change --accent to recolour)
    ├── js/main.js           gallery filter, FAQ accordion, form validation
    └── images/              put real photos and the logo here

No build step. Open `index.html`, or run `python3 -m http.server` in this folder.
Fonts load from Google Fonts (internet needed).

To finish:
- Replace placeholder tiles with real photos (`images/`).
- Fill the bracketed FAQ answers in contact.html.
- 15 Aug 2026 is a Saturday, not a Friday – check the date.
- Connect the form to a backend (TODO in js/main.js).
