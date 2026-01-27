# Navbar documentation (non-technical walkthrough)

This guide explains what every piece of the navbar code does in plain English.
It covers the two files that make the navbar work:
- `src/components/Navbar.jsx` (the React component)
- `src/styles/Navbar.css` (the styling)

If you read this top to bottom, you will understand what each line is for, even if
you are not a programmer.

---

## File: `src/components/Navbar.jsx`

### 1) Imports

```
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
```

- `useState`, `useEffect`, and `useRef` are React tools:
  - `useState` stores changing values (like “is the menu open?”).
  - `useEffect` runs code when something changes (like listening for the Escape key).
  - `useRef` stores a reference to a real DOM element (so we can focus it).
- `NavLink` is a React Router helper that knows whether a link is “active”.
- `logo` loads the image file for the brand logo.
- The CSS file is imported so the navbar gets its styles.

### 2) The navigation links list

```
const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" },
  { to: "/policy", label: "Policy" },
  { to: "/contact", label: "Contact" },
];
```

- This is the list of pages that appear in the menu.
- Each item says:
  - `to`: where the link goes (the URL).
  - `label`: the text the user sees.
  - `end: true` for the Home link so it only matches `/` exactly.

### 3) Component start

```
const Navbar = () => {
```

- This begins the React component named `Navbar`.
- Everything inside controls how the navbar behaves and looks.

### 4) State (things that can change)

```
const [menuOpen, setMenuOpen] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
```

- `menuOpen` is `true` when the hamburger dropdown is open.
- `searchOpen` is `true` when the search input is visible.
- `searchQuery` stores whatever the user types into the search box.
- `useState(false)` means “start closed.”
- `useState("")` means “start with an empty search.”

### 5) Refs (references to actual DOM elements)

```
const menuRef = useRef(null);
const searchPanelRef = useRef(null);
const menuButtonRef = useRef(null);
const searchButtonRef = useRef(null);
const searchInputRef = useRef(null);
```

- These let the code “point at” real buttons and panels on the screen.
- This is how we can:
  - Move focus (for keyboard accessibility).
  - Detect clicks outside the menu/search panel.

### 6) Remembering body scroll state

```
const bodyOverflowRef = useRef("");
```

- When the menu opens, we lock scrolling.
- This ref saves the original scroll setting so it can be restored later.

### 7) Remembering whether a panel was open

```
const wasMenuOpenRef = useRef(false);
const wasSearchOpenRef = useRef(false);
```

- These keep track of whether the menu or search was open *before* it closed.
- That lets us send keyboard focus back to the right button after closing.

### 8) Helper functions to close panels

```
const closeMenu = () => setMenuOpen(false);
const closeSearch = () => setSearchOpen(false);
```

- Short, readable helpers for closing the menu or search.
- This keeps the JSX click handlers clean and easy to read.

### 9) Toggle functions (open/close with one click)

```
const toggleMenu = () => {
  setMenuOpen((prev) => {
    const next = !prev;
    if (next) setSearchOpen(false);
    return next;
  });
};
```

- This opens the menu if it is closed, or closes it if open.
- If the menu is opening, it forces the search panel to close.
- This avoids two panels being open at the same time.

```
const toggleSearch = () => {
  setSearchOpen((prev) => {
    const next = !prev;
    if (next) setMenuOpen(false);
    return next;
  });
};
```

- Same idea as `toggleMenu`, but for the search panel.
- If search opens, the menu closes.

### 10) Effect: lock page scroll when menu opens

```
useEffect(() => {
  if (menuOpen) {
    bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = bodyOverflowRef.current;
    document.body.style.touchAction = "";
  }
}, [menuOpen]);
```

- When the menu is open:
  - The background page does not scroll.
  - This makes the menu feel like a focused overlay.
- When the menu closes:
  - The original scroll setting is restored.
- `[menuOpen]` means it runs whenever `menuOpen` changes.

### 11) Effect: focus the menu when it opens

```
useEffect(() => {
  if (menuOpen) {
    wasMenuOpenRef.current = true;
    window.requestAnimationFrame(() => {
      const firstLink =
        menuRef.current?.querySelector(
          "a[href], button, [tabindex]:not([tabindex='-1'])"
        ) || menuRef.current;
      firstLink?.focus();
    });
  } else if (wasMenuOpenRef.current) {
    menuButtonRef.current?.focus();
    wasMenuOpenRef.current = false;
  }
}, [menuOpen]);
```

- If the menu opens:
  - Mark that it was open.
  - After the next paint, focus the first link for keyboard users.
- If the menu closes:
  - Return focus to the hamburger button.
- This is important for accessibility and keyboard navigation.

### 12) Effect: focus the search input when it opens

```
useEffect(() => {
  if (searchOpen) {
    wasSearchOpenRef.current = true;
    window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  } else if (wasSearchOpenRef.current) {
    searchButtonRef.current?.focus();
    wasSearchOpenRef.current = false;
  }
}, [searchOpen]);
```

- When search opens:
  - Focus jumps into the input so the user can type immediately.
- When search closes:
  - Focus returns to the search button.

### 13) Effect: ESC key and outside click handling

```
useEffect(() => {
  if (!menuOpen && !searchOpen) return;

  const handleKeyDown = (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    if (menuOpen) closeMenu();
    if (searchOpen) closeSearch();
  };

  const handlePointerDown = (event) => {
    const target = event.target;
    if (menuOpen) {
      const inMenu = menuRef.current?.contains(target);
      const inMenuButton = menuButtonRef.current?.contains(target);
      if (!inMenu && !inMenuButton) closeMenu();
    }
    if (searchOpen) {
      const inSearch = searchPanelRef.current?.contains(target);
      const inSearchButton = searchButtonRef.current?.contains(target);
      if (!inSearch && !inSearchButton) closeSearch();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("mousedown", handlePointerDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("mousedown", handlePointerDown);
  };
}, [menuOpen, searchOpen]);
```

- If neither panel is open, nothing happens.
- If a panel is open:
  - Pressing Escape closes it.
  - Clicking anywhere outside closes it.
- Cleanup removes listeners when the panels close.
- This keeps the app fast and prevents “leaky” listeners.

### 14) JSX: the visible navbar (the HTML-like part)

```
return (
  <>
    <header className="navbar">
      ...
    </header>
  </>
);
```

- This is the actual UI that appears on the page.
- `<header>` is a semantic container for the navbar.

### 15) Brand/logo area

```
<NavLink
  className="navbar__brand"
  to="/"
  onClick={() => {
    closeMenu();
    closeSearch();
  }}
>
  <img className="navbar__logo" src={logo} alt="Amy's Nail Salon and Spa" />
  <span className="navbar__brand-text">Amy's</span>
</NavLink>
```

- Clicking the logo takes you to the home page.
- It also closes any open menu or search panel.
- `alt` text is for screen readers and accessibility.

### 16) Desktop nav links

```
<nav className="navbar__nav" aria-label="Primary">
  <ul className="navbar__links">
    {navLinks.map((link) => (
      <li key={link.to}>
        <NavLink
          to={link.to}
          end={link.end}
          onClick={closeSearch}
          className={({ isActive }) =>
            `navbar__link${isActive ? " is-active" : ""}`
          }
        >
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>
</nav>
```

- On desktop, links appear horizontally in the header.
- `navLinks.map` loops through the list and creates a link for each.
- `NavLink` applies `is-active` when the current page matches.
- `aria-label` helps screen readers identify the nav area.

### 17) Search and menu buttons

```
<div className="navbar__actions">
  <button
    className="icon-button"
    type="button"
    aria-label={searchOpen ? "Close search" : "Open search"}
    aria-expanded={searchOpen}
    aria-controls="site-search-panel"
    onClick={toggleSearch}
    ref={searchButtonRef}
  >
    ...
  </button>
  <button
    className="menu-button"
    type="button"
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    aria-expanded={menuOpen}
    aria-controls="site-menu"
    onClick={toggleMenu}
    ref={menuButtonRef}
  >
    ...
  </button>
</div>
```

- These are the search and hamburger buttons.
- They use inline SVG for icons (no icon library required).
- `aria-expanded` tells screen readers if the panel is open.
- `aria-controls` links the button to the panel it opens.

### 18) Mobile dropdown menu panel

```
<div
  className={`navbar__dropdown ${menuOpen ? "is-open" : ""}`}
  aria-hidden={!menuOpen}
  id="site-menu"
>
  <div className="menu-panel" ref={menuRef} tabIndex={-1}>
    <nav aria-label="Mobile">
      <ul className="menu-links">
        {navLinks.map(...)}
      </ul>
    </nav>
  </div>
</div>
```

- The dropdown appears under the header.
- The `is-open` class is added only when `menuOpen` is true.
- `aria-hidden` hides it from screen readers when closed.
- `tabIndex={-1}` lets us focus the panel for accessibility.

### 19) Search panel

```
<div
  className={`navbar__search ${searchOpen ? "is-open" : ""}`}
  aria-hidden={!searchOpen}
  id="site-search-panel"
  ref={searchPanelRef}
>
  <form
    className="search-form"
    role="search"
    onSubmit={(event) => {
      event.preventDefault();
    }}
  >
    <label className="sr-only" htmlFor="site-search">
      Search services
    </label>
    <input
      id="site-search"
      type="search"
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      placeholder="Search services"
      aria-label="Search services"
      ref={searchInputRef}
    />
  </form>
</div>
```

- This section shows the search input when `searchOpen` is true.
- `role="search"` helps assistive tech.
- The label is hidden visually but still accessible.
- Input is controlled by `searchQuery`.
- `onSubmit` is a stub for future backend search logic.

---

## File: `src/styles/Navbar.css`

This file controls how the navbar looks on mobile and desktop.

### 1) Import shared variables

```
@import "./variables.css";
```

- Pulls in shared colors, spacing, radius, and shadows.

### 2) Navbar container

```
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(246, 241, 238, 0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(230, 217, 212, 0.6);
  overflow: visible;
  transition: background var(--transition-soft),
    box-shadow var(--transition-soft),
    transform var(--transition-soft);
}
```

- Sticky keeps the navbar at the top when scrolling.
- Background is slightly translucent for a premium look.
- `backdrop-filter` blurs content behind it.
- A subtle border separates it from content below.

### 3) Inner layout

```
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 18px var(--space-5);
  min-height: 76px;
}
```

- Flexbox aligns logo and buttons in one row.
- Padding makes the bar taller on mobile.
- `min-height` ensures a large, premium header.

### 4) Brand/logo

```
.navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--color-text);
  white-space: nowrap;
}

.navbar__logo {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-sm);
  object-fit: contain;
}

.navbar__brand-text {
  font-family: "Cormorant Garamond", "Baskerville", "Georgia", serif;
  font-size: 1.1rem;
  letter-spacing: 0.03em;
}
```

- Logo and text sit side by side.
- `white-space: nowrap` prevents awkward wrapping.
- Logo is intentionally larger for visibility.

### 5) Action buttons

```
.navbar__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}
```

- Holds search and hamburger buttons.
- `margin-left: auto` pushes them to the right.

```
.icon-button,
.menu-button {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  background: var(--color-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  box-shadow: 0 8px 16px rgba(31, 21, 17, 0.08);
  transition: transform var(--transition-soft),
    box-shadow var(--transition-soft),
    border-color var(--transition-soft);
}
```

- Buttons are at least 44px (touch target size).
- Soft shadows and rounded shape feel premium.

```
.icon-button svg,
.menu-button svg {
  width: 20px;
  height: 20px;
}
```

- Icon sizes are balanced for readability.

```
.icon-button:focus-visible,
.menu-button:focus-visible,
.menu-link:focus-visible,
.navbar__link:focus-visible,
.search-form input:focus-visible {
  outline: 2px solid var(--color-accent-strong);
  outline-offset: 2px;
}
```

- Visible focus outline for keyboard users.

```
.icon-button:hover,
.menu-button:hover {
  transform: translateY(-1px);
  border-color: var(--color-border);
}
```

- Slight hover lift for a subtle, premium interaction.

```
.menu-button {
  background: linear-gradient(140deg, #ffffff 0%, #f7ece9 100%);
}
```

- The hamburger button has a gentle gradient for emphasis.

### 6) Desktop links hidden on mobile

```
.navbar__links {
  list-style: none;
  display: none;
  gap: var(--space-5);
  align-items: center;
  margin: 0;
  padding: 0;
}
```

- On mobile, the horizontal nav is hidden.
- It shows at the desktop breakpoint later in the file.

### 7) Dropdown and search panels

```
.navbar__dropdown,
.navbar__search {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  padding: 0 var(--space-5) var(--space-5);
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-6px);
  transition: opacity var(--transition-soft),
    transform var(--transition-soft);
  z-index: 55;
}
```

- Both panels appear just below the navbar.
- They are hidden by default (opacity/visibility/pointer-events).
- They slide down slightly when they appear.

```
.navbar__dropdown.is-open,
.navbar__search.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}
```

- The `is-open` class makes a panel visible and clickable.

### 8) Dropdown panel style

```
.menu-panel {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-subtle);
  border: 1px solid var(--color-border);
  padding: var(--space-4) var(--space-4);
  width: 100%;
  max-width: 520px;
}
```

- Creates the clean, light dropdown panel.
- `max-width` keeps it tidy on large screens.

```
.menu-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
}
```

- The mobile menu is a vertical list with generous spacing.

```
.menu-link {
  font-family: "Cormorant Garamond", "Baskerville", "Georgia", serif;
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-2);
  min-height: 44px;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-soft),
    color var(--transition-soft);
}
```

- Large, easy-to-tap menu items.
- `min-height: 44px` ensures touch comfort.

```
.menu-link.is-active {
  border-color: var(--color-accent);
  color: var(--color-accent-strong);
}
```

- Active page gets a subtle highlight.

### 9) Search panel styles

```
.navbar__search {
  padding-top: 0;
}

.search-form {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-subtle);
  border: 1px solid var(--color-border);
  padding: var(--space-3);
  width: 100%;
  max-width: 520px;
  margin-left: auto;
}

.search-form input {
  width: 100%;
  min-height: 48px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  padding: 0 var(--space-4);
  font-size: 1rem;
  font-family: "Poppins", "Helvetica Neue", "Arial", sans-serif;
  background: #fff;
  color: var(--color-text);
}
```

- Search panel matches the dropdown style.
- Input is big enough for easy tapping and typing.

### 10) Desktop layout at 900px+

```
@media (min-width: 900px) {
  .navbar__links {
    display: inline-flex;
  }

  .navbar__actions .menu-button {
    display: none;
  }

  .navbar__actions .icon-button {
    width: 38px;
    height: 38px;
  }

  .navbar__inner {
    padding: var(--space-4) var(--space-8);
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar__nav {
    margin-left: auto;
  }

  .navbar__actions {
    margin-left: var(--space-6);
  }

  .navbar__dropdown,
  .navbar__search {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}
```

- Desktop shows horizontal links and hides the hamburger.
- Slightly smaller icons fit the desktop scale.
- The navbar content is centered inside a max width.

### 11) Reduced motion support

```
@media (prefers-reduced-motion: reduce) {
  .navbar,
  .navbar__inner,
  .navbar__dropdown,
  .navbar__search,
  .menu-panel,
  .icon-button,
  .menu-button {
    transition: none;
  }
}
```

- If a user prefers less motion, animations are disabled.

---

## Notes about safety and future backend readiness

- Search input is plain text only (no HTML injection).
- No secrets or API keys are stored in the front end.
- There is a placeholder `onSubmit` for future integration.

---

If you want this same style of “plain English” documentation for
`src/index.jsx`, `index.html`, or `src/styles/variables.css`, tell me and
I will extend this doc. 
