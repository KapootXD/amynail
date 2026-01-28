# Quick actions documentation (non-technical walkthrough)

This guide explains what the Quick Actions rail does in plain English.
It covers the two files that make it work:
- `src/components/QuickActions.jsx` (the React component)
- `src/components/QuickActions.css` (the styling)

If you read this top to bottom, you will understand what the quick action
buttons are doing, even if you are not a programmer.

---

## File: `src/components/QuickActions.jsx`

### 1) Imports

```
import { Link } from "react-router-dom";
import "./QuickActions.css";
```

- `Link` is used for internal navigation to the booking page.
- The CSS file is imported so the rail gets its styles.

### 2) Constants (safe defaults and easy future changes)

```
const FACEBOOK_URL = "https://www.facebook.com/your-salon";
const TIKTOK_URL = "https://www.tiktok.com/@your-salon";
const PHONE_E164 = "+13375173831";
const PHONE_DISPLAY = "(337) 517-3831";
const BOOKING_PATH = "/booking";
```

- All URLs and phone numbers live at the top for easy replacement later.
- The Facebook and TikTok URLs are placeholders with TODO notes.
- The phone number uses E.164 format for the `tel:` link.

### 3) Component wrapper

```
<aside className="quick-actions" aria-label="Quick actions">
  ...buttons...
</aside>
```

- Uses `<aside>` for a semantic floating rail.
- `aria-label` makes it clear for screen readers.

### 4) External social buttons

```
<a
  className="quick-actions__button"
  href={FACEBOOK_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit our Facebook page"
  title="Facebook"
>
  ...icon + label...
</a>
```

- External links open in a new tab.
- `rel="noopener noreferrer"` is a security best practice.
- Each button has a label and an icon for accessibility.

### 5) Call button (tap to call)

```
<a
  className="quick-actions__button"
  href={`tel:${PHONE_E164}`}
  aria-label={`Call ${PHONE_DISPLAY}`}
  title={`Call ${PHONE_DISPLAY}`}
>
  ...phone icon...
</a>
```

- Tapping the phone button opens the phone dialer on mobile.
- The visible text stays clean while the link uses E.164 format.

### 6) Booking button (internal navigation)

```
<Link
  className="quick-actions__button quick-actions__button--primary"
  to={BOOKING_PATH}
  aria-label="Book an appointment"
  title="Book"
>
  ...calendar icon...
</Link>
```

- Uses `Link` so routing stays inside the app (no page reload).
- The primary style subtly highlights the booking action.

### 7) Inline SVG icons

```
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path ... />
</svg>
```

- Icons are inline SVG (no external icon library).
- `aria-hidden` keeps screen readers focused on the button labels.

---

## File: `src/components/QuickActions.css`

This file controls the rail layout, sizing, and interactions.

### 1) Global tokens

```
@import "../styles/variables.css";
```

- Pulls in shared colors, spacing, radius, and shadows.

### 2) Fixed rail positioning

```
.quick-actions {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  z-index: 40;
}
```

- The rail is fixed to the right edge and centered vertically.
- A safe `z-index` keeps it above the page content.

### 3) Button styling (square, premium, touch-ready)

```
.quick-actions__button {
  --quick-action-size: 56px;
  width: var(--quick-action-size);
  height: var(--quick-action-size);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-accent-strong);
  box-shadow: var(--shadow-subtle);
}
```

- Square buttons with gentle corners.
- Soft shadow and neutral palette to match the site.
- Size meets the 44px tap target guideline.

### 4) Primary booking style

```
.quick-actions__button--primary {
  background: linear-gradient(150deg, #ffffff 0%, #f4e6ea 100%);
  color: var(--color-text);
  border-color: rgba(214, 165, 178, 0.6);
}
```

- Adds a soft blush gradient to highlight booking.

### 5) Icons and labels

```
.quick-actions__icon {
  width: 22px;
  height: 22px;
}

.quick-actions__label {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}
```

- Icon sizes stay compact.
- Labels are small but readable, matching the feminine theme.

### 6) Interactions (hover + active)

```
@media (hover: hover) and (pointer: fine) {
  .quick-actions__button:hover {
    transform: translateX(-6px);
    box-shadow: 0 18px 36px rgba(31, 21, 17, 0.18);
  }
}

.quick-actions__button:active {
  transform: translateX(0) scale(0.96);
}
```

- Desktop hover slides the button left slightly.
- Pressing scales down for tactile feedback.

### 7) Mobile adjustments

```
@media (max-width: 480px) {
  .quick-actions__button {
    --quick-action-size: 52px;
  }

  .quick-actions__label {
    display: none;
  }
}
```

- Buttons get slightly smaller on mobile.
- Labels hide to save space while icons remain visible.

### 8) Reduced motion support

```
@media (prefers-reduced-motion: reduce) {
  .quick-actions__button {
    transition: none;
  }

  .quick-actions__button:hover {
    transform: none;
  }
}
```

- Animations are disabled when the user prefers reduced motion.

---

## Integration note

`src/components/Layout.jsx` renders `<QuickActions />` so the rail appears on every page.

---

## Notes about safety and future backend readiness

- No HTML is injected and no secrets are stored in the code.
- External links use safe `rel` attributes when opening a new tab.
- URLs and phone numbers are centralized for easy future updates.

---

If you want this same style of documentation for other components,
tell me and I will add it.
