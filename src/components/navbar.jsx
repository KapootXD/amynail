import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" },
  { to: "/policy", label: "Policy" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  // UI state for the mobile dropdown menu and the search panel.
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Refs used for focus management and outside-click detection.
  const menuRef = useRef(null);
  const searchPanelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const searchButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  // Preserve body scroll settings when the menu opens.
  const bodyOverflowRef = useRef("");
  // Track prior open state to restore focus only after a close action.
  const wasMenuOpenRef = useRef(false);
  const wasSearchOpenRef = useRef(false);

  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);

  // Toggle handlers keep only one panel open at a time.
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      if (next) setSearchOpen(false);
      return next;
    });
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => {
      const next = !prev;
      if (next) setMenuOpen(false);
      return next;
    });
  };

  useEffect(() => {
    // Lock background scroll while the menu is open.
    if (menuOpen) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = bodyOverflowRef.current;
      document.body.style.touchAction = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    // Move focus into the menu when it opens and restore it to the toggle.
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

  useEffect(() => {
    // Move focus to the search input when it opens and restore it to the toggle.
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

  useEffect(() => {
    // Global listeners: ESC closes panels; outside click closes the active panel.
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

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <NavLink
            className="navbar__brand"
            to="/"
            onClick={() => {
              closeMenu();
              closeSearch();
            }}
          >
            <img
              className="navbar__logo"
              src={logo}
              alt="Amy's Nail Salon and Spa"
            />
            <span className="navbar__brand-text">Amy's Nails Salon & Spa</span>
          </NavLink>

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
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="16.5"
                  y1="16.5"
                  x2="21"
                  y2="21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="8"
                  y1="17"
                  x2="20"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`navbar__dropdown ${menuOpen ? "is-open" : ""}`}
          aria-hidden={!menuOpen}
          id="site-menu"
        >
          <div className="menu-panel" ref={menuRef} tabIndex={-1}>
            <nav aria-label="Mobile">
              <ul className="menu-links">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => {
                        closeMenu();
                        closeSearch();
                      }}
                      end={link.end}
                      className={({ isActive }) =>
                        `menu-link${isActive ? " is-active" : ""}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

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
              // Stub handler; real search wiring can be added later.
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
      </header>
    </>
  );
};

export default Navbar;
