import React, { lazy, Suspense } from "react";
// IMAGES intentionally removed; featured images come from `src/data/projects.js`
import Footer from "../Component/Footer";
import CtaBand from "../Component/CtaBand";
import projects from "../data/projects";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import heroImage from "../image/rooms/living-room/IMG_0034.jpeg";

// Swiper (JS and CSS) only loads with this chunk, not in the initial bundle
const TestimonialSlider = lazy(() => import("../Component/TestimonialSlider"));

const PROCESS_STEPS = [
  {
    title: "Consultation",
    text: "We start with a visit to your home and a long conversation about how you live, what you love and what isn't working. Together we agree on scope and budget before any drawing begins.",
  },
  {
    title: "Design & 3D",
    text: "We plan the layout, choose materials and finishes, and show you photoreal 3D views of each room, so you can see your home before a single panel is cut.",
  },
  {
    title: "Execution",
    text: "Our team manages the carpenters, vendors and site work from start to finish, and keeps you updated at every stage.",
  },
  {
    title: "Handover",
    text: "We walk through the finished space with you, settle the last details and hand over a home that's ready to live in.",
  },
];

// Three rooms for the home grid; skip the hero photo so it isn't shown twice
const FEATURED = projects.slice(0, 3).map((p) => ({
  ...p,
  cover: p.images.find((src) => src !== heroImage) || p.image,
}));

export default function Home() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <Container>
          <Row>
            <Col lg={7} className="hero-copy">
              <h1>Interiors rooted in tradition, designed for modern living.</h1>
              <p>
                We design spaces that reflect your lifestyle — from concept to
                completion. Thoughtful materials, tailored layouts and on-time
                delivery.
              </p>
              <div className="hero-actions">
                <Button as={Link} to="/project" variant="primary">
                  View Projects
                </Button>
                <Link to="/contact" className="hero-link">
                  Book a consultation <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="process">
        <Container>
          <div className="text-center mb-5" data-reveal>
            <p className="eyebrow">How we work</p>
            <h2>From first visit to final handover</h2>
          </div>
          <Row as="ol" className="process-steps gx-4 gy-5">
            {PROCESS_STEPS.map((step, i) => (
              <Col as="li" key={step.title} xs={12} md={6} lg={3}>
                <div className="process-step" data-reveal style={{ "--i": i }}>
                  <span className="process-number" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-text">{step.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="featured-projects">
        <Container>
          <div className="text-center mb-5" data-reveal>
            <p className="eyebrow">Our work</p>
            <h2>Featured Projects</h2>
          </div>
          <div className="featured-grid">
            {FEATURED.map((p, i) => (
              <Link
                key={p.id}
                to={`/project?room=${p.slug}`}
                className={`featured-item${i === 0 ? " featured-item--large" : ""}`}
                data-reveal
                style={{ "--i": i }}
              >
                <div className="featured-media img-reveal">
                  <img src={p.cover} alt={`${p.title} designed by Sparkle Design Studio`} loading="lazy" />
                </div>
                <div className="featured-caption">
                  <p className="eyebrow">{p.title}</p>
                  <h3 className="featured-title">{p.description}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/project" className="text-link">
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="testimonials">
        <Container>
          <div className="text-center mb-5" data-reveal>
            <p className="eyebrow">Testimonial</p>
            <h2>What our clients say</h2>
          </div>
          <Suspense fallback={<div className="testimonial-slider testimonial-slider--loading" aria-hidden="true" />}>
            <TestimonialSlider />
          </Suspense>
        </Container>
      </section>

      <CtaBand />

      <Footer />
    </>
  );
}
