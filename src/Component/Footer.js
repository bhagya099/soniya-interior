import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../image/logo-trimmed.png";

const PHONE_DISPLAY = "+91 88059 89342";
const PHONE_TEL = "tel:+918805989342";
const WHATSAPP_URL = "https://wa.me/918805989342";
const EMAIL = "sparkledesignstudio7@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/sparklebysoniya?igsh=eWpoN2UwZ2ZhcDV4&utm_source=qr";

const LOCATION = "Pune, India";
const HOURS = "Mon – Sat, 10am – 7pm";

const Icon = ({ children }) => (
  <svg className="footer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const InstagramIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </Icon>
);

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-col">
            <img src={logo} alt="Sparkle Design Studio" className="footer-logo" loading="lazy" />
            <p className="footer-tagline">Crafting warm, livable spaces with timeless materials.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-social"
              aria-label="Sparkle Design Studio on Instagram">
              <InstagramIcon />
            </a>
          </div>

          <nav className="footer-col" aria-label="Footer">
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-list">
              <li><NavLink to="/project">Projects</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">Get in touch</h2>
            <ul className="footer-list footer-contact">
              <li>
                <a href={PHONE_TEL} className="footer-tap">
                  <Icon><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></Icon>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-tap">
                  <Icon><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4L3 21z" /><path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1-1.2 1.8.8-.3 1.6c-3.8.4-7.6-3.4-7.2-7.2l1.6-.3.8 1.8L9 9.5z" /></Icon>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="footer-email">
                  <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>
                  {EMAIL}
                </a>
              </li>
              <li className="footer-text">
                <Icon><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></Icon>
                {LOCATION}
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Studio hours</h2>
            <p className="footer-text">{HOURS}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sparkle Design Studio</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
