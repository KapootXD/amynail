import "./Footer.css";

const PHONE_DISPLAY = "(337) 517-3832";
const PHONE_LINK = "+13375173832";
const ADDRESS_TEXT = "909 Charity Street, Abbeville, Louisiana 70510";
const MAP_QUERY =
  "909 Charity Street, Abbeville, Louisiana 70510";

// TODO: Replace with the official Google Maps embed URL if needed.
const DEFAULT_MAP_EMBED_URL =
  "https://www.google.com/maps?q=909+Charity+Street,+Abbeville,+LA+70510&output=embed";

const MAP_EMBED_URL =
  import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || DEFAULT_MAP_EMBED_URL;

// TODO: Replace these with real social links when available.
const FACEBOOK_URL =
  import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com";
const GOOGLE_URL =
  import.meta.env.VITE_GOOGLE_URL ||
  "https://www.google.com/maps/search/?api=1&query=909+Charity+Street+Abbeville+LA+70510";
const TIKTOK_URL =
  import.meta.env.VITE_TIKTOK_URL || "https://tiktok.com";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <div className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M7 2c-.6 0-1.1.3-1.4.8L4.1 5.2c-.3.5-.3 1.1 0 1.6l2.2 3.4a1.6 1.6 0 0 0 1.5.7c.8-.1 1.6-.2 2.4-.2.8 0 1.6.1 2.4.2.6.1 1.2-.1 1.5-.7l2.2-3.4c.3-.5.3-1.1 0-1.6l-1.5-2.4c-.3-.5-.8-.8-1.4-.8H7Z"
                  fill="currentColor"
                  opacity="0.18"
                />
                <path
                  d="M15.3 14.4c-1.6.8-3.3 1.2-5 1.2-1.7 0-3.4-.4-5-1.2-.7-.3-1.4.1-1.5.9-.1.7-.1 1.4.1 2.1.2.7.7 1.2 1.4 1.4 1.6.5 3.3.8 5 .8 1.7 0 3.4-.3 5-.8.7-.2 1.2-.7 1.4-1.4.2-.7.2-1.4.1-2.1-.1-.8-.8-1.2-1.5-.9Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <p className="footer__label">Phone</p>
              <a className="footer__link" href={`tel:${PHONE_LINK}`}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M12 2c-3.6 0-6.5 2.9-6.5 6.5 0 4.9 6.5 12.9 6.5 12.9s6.5-8 6.5-12.9C18.5 4.9 15.6 2 12 2Zm0 8.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <p className="footer__label">Address</p>
              <a
                className="footer__link footer__link--stack"
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>909 Charity Street</span>
                <span>Abbeville, Louisiana 70510</span>
              </a>
            </div>
          </div>

          <div className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm.8 4.6v4.5l3.4 2.1a.8.8 0 0 1-.8 1.4l-3.8-2.4a.8.8 0 0 1-.4-.7V7.6a.8.8 0 0 1 1.6 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <p className="footer__label">Hours</p>
              <div className="footer__hours">
                <span>Monday-Friday: 9am - 6:30pm</span>
                <span>Saturday: 8:30am - 6pm</span>
                <span>Sunday: off</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__map">
          <iframe
            className="footer__map-frame"
            src={MAP_EMBED_URL}
            title={`Map for ${MAP_QUERY}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="footer__socials">
          <a
            className="footer__social"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M14.5 8.5V7.1c0-.7.5-1.1 1.1-1.1h1.4V3.5h-2.4c-2.3 0-3.6 1.4-3.6 3.7v1.3H9v2.6h2V21h3v-9.9h2.5l.4-2.6h-2.4Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            className="footer__social"
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Find us on Google Maps"
            title="Google Maps"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M12 3a9 9 0 0 0-9 9c0 3.6 2.2 6.7 5.4 8l-.4-2.9a5.9 5.9 0 0 1-2.5-5.1 6.4 6.4 0 0 1 6.5-6.4 6.1 6.1 0 0 1 4.3 1.8 5.7 5.7 0 0 1 1.6 4.1c0 2.7-1.6 4.8-3.9 5.4-1 .2-2.2 0-2.5-1 .7-1.8 1.2-3.7 1.2-5.3 0-1.2-.6-2.2-1.8-2.2-1.4 0-2.4 1.4-2.4 3.2 0 1.2.4 2 .4 2l-1.6 6.6c.6.2 1.3.3 2 .3a9 9 0 0 0 9-9 9 9 0 0 0-9-9Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            className="footer__social"
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on TikTok"
            title="TikTok"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M16.5 3.5c.6 1.7 1.9 3 3.6 3.6v2.6c-1.6 0-3.2-.5-4.6-1.5v6.2a5.5 5.5 0 1 1-4.8-5.4v2.8a2.7 2.7 0 1 0 2 2.6V3.5h3.8Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        <p className="footer__copy">
          {"\u00A9"} {currentYear} Amy&apos;s Nail Salon &amp; Spa. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
