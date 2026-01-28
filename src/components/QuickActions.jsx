import { Link } from "react-router-dom";
import "../styles/QuickActions.css";

const FACEBOOK_URL = "https://www.facebook.com/your-salon"; // TODO: replace with the real Facebook URL.
const TIKTOK_URL = "https://www.tiktok.com/@your-salon"; // TODO: replace with the real TikTok URL.
const PHONE_E164 = "+13375173832";
const PHONE_DISPLAY = "(337) 517-3832";
const BOOKING_PATH = "/booking";

const QuickActions = () => {
  return (
    <aside className="quick-actions" aria-label="Quick actions">
      <a
        className="quick-actions__button"
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our Facebook page"
        title="Facebook"
      >
        <span className="quick-actions__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M14.5 8.5h2.5V6h-2.5c-2.2 0-4 1.8-4 4v2H8v2.5h2.5V20h2.7v-5.5h2.4l.6-2.5h-3V10c0-.8.6-1.5 1.5-1.5z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="quick-actions__label">Facebook</span>
      </a>

      <a
        className="quick-actions__button"
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our TikTok page"
        title="TikTok"
      >
        <span className="quick-actions__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M14 4c1.1 1.7 2.7 2.9 5 3v2.7c-1.9-.1-3.6-.8-5-2v6.5c0 3-2.4 5.3-5.4 5.3a5.3 5.3 0 0 1-5.3-5.3c0-2.9 2.4-5.3 5.3-5.3.4 0 .9.1 1.3.2v2.9a2.5 2.5 0 0 0-1.3-.4 2.6 2.6 0 0 0 0 5.2 2.6 2.6 0 0 0 2.6-2.6V4h2.8z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="quick-actions__label">TikTok</span>
      </a>

      <a
        className="quick-actions__button"
        href={`tel:${PHONE_E164}`}
        aria-label={`Call ${PHONE_DISPLAY}`}
        title={`Call ${PHONE_DISPLAY}`}
      >
        <span className="quick-actions__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M6.7 4.6c.4-.4 1-.5 1.5-.3l2.4 1a1.2 1.2 0 0 1 .7 1.6l-.8 2a13.2 13.2 0 0 0 5.6 5.6l2-.8a1.2 1.2 0 0 1 1.6.7l1 2.4c.2.5.1 1.1-.3 1.5l-1.3 1.3c-.6.6-1.5.8-2.3.7-7.6-1.3-13.7-7.4-15-15-.1-.8.1-1.7.7-2.3l1.2-1.1z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="quick-actions__label">Call</span>
      </a>

      <Link
        className="quick-actions__button quick-actions__button--primary"
        to={BOOKING_PATH}
        aria-label="Book an appointment"
        title="Book"
      >
        <span className="quick-actions__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M7 4a1 1 0 0 1 1 1v1h8V5a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V5a1 1 0 0 1 1-1zm12 8H5v6h14v-6z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="quick-actions__label">Book</span>
      </Link>
    </aside>
  );
};

export default QuickActions;
