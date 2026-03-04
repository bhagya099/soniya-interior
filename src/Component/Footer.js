import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="align-items-start gy-4">
          <Col md={6}>
            <h3 className="footer-brand">Sparkle Design Studio</h3>
            <p className="footer-tagline">Crafting warm, livable spaces with timeless materials.</p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a8.5 8.5 0 00-8.5 8.5c0 3.75 2.2 6.95 5.35 8.25-.07-.7-.13-1.77.03-2.53.15-.68 1-4.36 1-4.36s-.25-.5-.25-1.25c0-1.17.68-2.05 1.53-2.05.72 0 1.07.54 1.07 1.19 0 .72-.46 1.79-.7 2.78-.2.84.42 1.52 1.25 1.52 1.5 0 2.67-1.59 2.67-3.88 0-2.01-1.45-3.42-3.52-3.42-2.4 0-3.82 1.8-3.82 3.66 0 .73.28 1.52.63 1.95.07.08.08.15.06.24-.07.26-.22.84-.25.95-.04.16-.13.2-.3.12-1.12-.52-1.82-2.14-1.82-3.44 0-2.8 2.03-5.37 5.87-5.37 3.09 0 5.5 2.21 5.5 5.16 0 3.07-1.94 5.54-4.64 5.54-0.9 0-1.75-.47-2.04-1.02 0 0-.48 1.84-.6 2.24-.22.82-.8 1.64-1.27 2.28 1 .31 2.06.48 3.16.48 4.7 0 8.5-3.8 8.5-8.5S16.7 2 12 2z" fill="currentColor"/></svg>
              </a>
            </div>
          </Col>

          <Col md={6}>
            <h6 className="footer-heading">Stay in touch</h6>
            <p className="mb-2">News, occasional design tips, and new projects.</p>
            <Form className="d-flex footer-subscribe" onSubmit={(e)=>e.preventDefault()}>
              <Form.Control type="email" placeholder="Email address" aria-label="Email" className="me-2" />
              <Button variant="primary" type="submit">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4 pt-3 align-items-center border-top">
          <Col md={6} className="small text-muted">© {new Date().getFullYear()} Soniya Interior. All rights reserved.</Col>
          <Col md={6} className="text-md-end small">
            <Link to="/privacy" className="me-3">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
