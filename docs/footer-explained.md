# Footer documentation (non-technical walkthrough)

This guide explains the important parts of the footer in plain English.
It covers the two files that make the footer work:
- `src/components/Footer.jsx` (the React component)
- `src/components/Footer.css` (the styling)

If you read this top to bottom, you will understand what the footer is doing,
even if you are not a programmer.

---

## File: `src/components/Footer.jsx`

### 1) Imports

```
import "./Footer.css";
```

- Loads the footer styles so the component looks correct.

### 2) Contact, address, and map constants

```
const PHONE_DISPLAY = "(337) 517-3831";
const PHONE_LINK = "+13375173831";
const ADDRESS_TEXT = "909 Charity Street, Abbeville, Louisiana 70510";
const MAP_QUERY = "909 Charity Street, Abbeville, Louisiana 70510";
```

- `PHONE_DISPLAY` is the friendly phone number customers see.
- `PHONE_LINK` is the tap-to-call phone format.
- `ADDRESS_TEXT` and `MAP_QUERY` store the address in one place for reuse.

### 3) The map embed URL (safe defaults + future-ready)

```
const DEFAULT_MAP_EMBED_URL =
  "https://www.google.com/maps?q=909+Charity+Street,+Abbeville,+LA+70510&output=embed";

const MAP_EMBED_URL =
  import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || DEFAULT_MAP_EMBED_URL;
```

- The footer uses a lightweight Google Maps iframe embed (no API key).
- If you ever need a different embed URL, you can set it in the environment
  (`VITE_GOOGLE_MAPS_EMBED_URL`) without changing code.
- This keeps the frontend secure and ready for future deployment on AWS.

### 4) Social links (placeholders that can be replaced later)

```
const FACEBOOK_URL =
  import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com";
const GOOGLE_URL =
  import.meta.env.VITE_GOOGLE_URL ||
  "https://www.google.com/maps/search/?api=1&query=909+Charity+Street+Abbeville+LA+70510";
const TIKTOK_URL =
  import.meta.env.VITE_TIKTOK_URL || "https://tiktok.com";
```

- These are the URLs used for the social buttons.
- If you set real URLs in `.env`, they will override the placeholders.
- All links open safely in a new tab with the proper security attributes.

### 5) Component start + current year

```
const Footer = () => {
  const currentYear = new Date().getFullYear();
```

- Begins the React component.
- The year is calculated automatically, so the copyright stays current.

### 6) The footer layout (big picture)

```
return (
  <footer className="footer">
    <div className="footer__container">
      ...
    </div>
  </footer>
);
```

- Uses a real `<footer>` tag for semantic HTML.
- Everything sits inside a centered container for clean spacing.

### 7) Top info row: phone, address, hours

```
<div className="footer__info">
  <div className="footer__item"> ... Phone ... </div>
  <div className="footer__item"> ... Address ... </div>
  <div className="footer__item"> ... Hours ... </div>
</div>
```

- This is the top strip of the footer.
- On mobile: these stack vertically.
- On desktop: they appear as three columns.

### 8) Phone block (tap to call)

```
<a className="footer__link" href={`tel:${PHONE_LINK}`}>
  {PHONE_DISPLAY}
</a>
```

- Tapping the phone number on a mobile device opens the dialer.
- The visible text stays formatted nicely.

### 9) Address block (opens Google Maps)

```
<a
  className="footer__link footer__link--stack"
  href={GOOGLE_URL}
  target="_blank"
  rel="noopener noreferrer"
>
  <span>909 Charity Street</span>
  <span>Abbeville, Louisiana 70510</span>
</a>
```

- The address is clickable and opens in a new tab.
- `rel="noopener noreferrer"` is a safety best practice.
- The address is split onto two lines for readability.

### 10) Hours block (plain text)

```
<div className="footer__hours">
  <span>Monday-Friday: 9am - 6:30pm</span>
  <span>Saturday: 8:30am - 6pm</span>
  <span>Sunday: off</span>
</div>
```

- Hours are plain text (no link needed).
- The layout keeps them clean and easy to scan.

### 11) Embedded Google Map (lightweight iframe)

```
<iframe
  className="footer__map-frame"
  src={MAP_EMBED_URL}
  title={`Map for ${MAP_QUERY}`}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
/>
```

- Uses an iframe embed (fast and simple).
- `loading="lazy"` improves performance on mobile.
- `title` helps screen readers.
- The map is responsive and styled in CSS.

### 12) Social buttons row

```
<div className="footer__socials">
  <a className="footer__social" href={FACEBOOK_URL} ...>...</a>
  <a className="footer__social" href={GOOGLE_URL} ...>...</a>
  <a className="footer__social" href={TIKTOK_URL} ...>...</a>
</div>
```

- Three circular icon buttons: Facebook, Google Maps, TikTok.
- Each has `aria-label` and `title` for accessibility.
- Uses inline SVG icons (no external icon library).

### 13) Copyright line

```
<p className="footer__copy">
  {"\u00A9"} {currentYear} Amy&apos;s Nail Salon &amp; Spa. All rights reserved.
</p>
```

- Uses the current year automatically.
- The copyright symbol is safely embedded in JSX.

---

## File: `src/components/Footer.css`

This file controls the footer’s layout and spacing.

### 1) Global tokens

```
@import "../styles/variables.css";
```

- Pulls in shared colors, spacing, and shadows.

### 2) Overall footer wrapper

```
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-9) var(--space-5) var(--space-7);
}
```

- Gives a soft background and clear separation from the page.
- Generous padding keeps it premium and uncluttered.

### 3) The container that centers everything

```
.footer__container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}
```

- Centers the footer content and keeps it from getting too wide.
- Stacks sections with comfortable spacing.

### 4) The top info row (mobile-first)

```
.footer__info {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}
```

- Single column on mobile, so it feels clean and readable.

### 5) Icon + text layout

```
.footer__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}
```

- Puts the icon next to the text.
- Aligns neatly at the top for tidy spacing.

### 6) Icon styling

```
.footer__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: #fff;
  color: var(--color-accent-strong);
  box-shadow: 0 12px 24px rgba(31, 21, 17, 0.08);
}
```

- Icons sit inside soft, circular buttons.
- The size meets touch accessibility guidelines.

### 7) Links and text styling

```
.footer__link {
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.1rem;
}

.footer__link--stack {
  flex-direction: column;
}
```

- Links are clean and readable.
- The address stacks neatly on two lines.

### 8) Map styling

```
.footer__map-frame {
  width: 100%;
  max-width: 920px;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
}
```

- The map is full width on mobile, constrained on desktop.
- The aspect ratio prevents layout jumps.

### 9) Social buttons

```
.footer__social {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
}
```

- Buttons are large enough for touch.
- Circular style matches the premium look.

### 10) Desktop breakpoint

```
@media (min-width: 900px) {
  .footer__info {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .footer__map-frame {
    aspect-ratio: 16 / 9;
  }
}
```

- On desktop, the top info row becomes three columns.
- The map becomes wider and more cinematic.

### 11) Reduced motion support

```
@media (prefers-reduced-motion: reduce) {
  .footer__social {
    transition: none;
  }
}
```

- Disables hover animations for users who prefer less motion.

---

## Notes about safety and future backend readiness

- No HTML is injected and no secrets are stored in the code.
- All external links open in a new tab and include safe `rel` attributes.
- Environment variables can replace URLs at deploy time (good for AWS hosting).

---

If you want this same style of documentation for `Layout.jsx`, or for other
components, tell me and I will add it.
