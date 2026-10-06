import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import emailConfig from "../emailConfig";
import logoFooter from "../image/logo.png";

const isConfigured = () =>
  !Object.values(emailConfig).some((v) => String(v).startsWith("YOUR_"));

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("idle"); // idle | sending | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    if (!isConfigured()) {
      setSubscribeStatus("error");
      return;
    }

    setSubscribeStatus("sending");
    try {
      await emailjs.send(
        emailConfig.SERVICE_ID,
        emailConfig.TEMPLATE_ID,
        {
          from_name: "Newsletter signup",
          from_email: subscribeEmail,
          project_brief: "",
          message: `New newsletter subscription request from ${subscribeEmail}.`,
        },
        { publicKey: emailConfig.PUBLIC_KEY }
      );
      setSubscribeStatus("success");
      setSubscribeEmail("");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Newsletter signup failed:", err);
      setSubscribeStatus("error");
    }
  };

  return (
    <footer className="footer-custom">
      <Container>
        <Row className="align-items-center gy-4">
          <Col md={2} className="footer-logo-col">
            <img src={logoFooter} alt="Sparkle Design Studio" className="footer-logo" loading="lazy" />
          </Col>
          <Col md={5} className="footer-brand-col">
            <h3 className="footer-brand">Sparkle Design Studio</h3>
            <p className="footer-tagline">Crafting warm, livable spaces with timeless materials.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/sparklebysoniya?igsh=eWpoN2UwZ2ZhcDV4&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </Col>

          <Col md={5} className="footer-subscribe-col">
            <h6 className="footer-heading">Stay in touch</h6>
            <p className="mb-2">News, occasional design tips, and new projects.</p>
            <Form className="d-flex footer-subscribe" onSubmit={handleSubscribe}>
              <Form.Control
                type="email"
                placeholder="Email address"
                aria-label="Email"
                className="me-2"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
                disabled={subscribeStatus === "sending"}
              />
              <Button variant="primary" type="submit" disabled={subscribeStatus === "sending"}>
                {subscribeStatus === "sending" ? "Sending…" : "Subscribe"}
              </Button>
            </Form>
            {subscribeStatus === "success" && (
              <p className="small text-success mb-0 mt-2">Thanks for subscribing!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="small text-danger mb-0 mt-2">Something went wrong. Please try again.</p>
            )}
          </Col>
        </Row>

        <Row className="mt-4 pt-3 align-items-center border-top">
          <Col md={6} className="small text-muted text-center text-md-start">
            © {new Date().getFullYear()} Sparkle Design Studio. All rights reserved.
          </Col>
          <Col md={6} className="text-center text-md-end small footer-links-col">
            <Link to="/project" className="me-3">Projects</Link>
            <Link to="/contact">Contact</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
