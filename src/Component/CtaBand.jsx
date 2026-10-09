import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ctaImage from "../image/rooms/living-room/living-room-13.jpeg";

// Closing "Let's design your space" band, shown above the footer
const CtaBand = () => (
  <section className="cta-band" style={{ "--cta-image": `url(${ctaImage})` }}>
    <Container className="text-center">
      <div data-reveal>
        <p className="eyebrow">Start your project</p>
        <h2>Let's design your space</h2>
      </div>
      <p className="cta-band-text">
        Tell us about your home and what you'd like to change. We'll take it from there.
      </p>
      <Button as={Link} to="/contact" variant="primary">
        Book a consultation
      </Button>
    </Container>
  </section>
);

export default CtaBand;
