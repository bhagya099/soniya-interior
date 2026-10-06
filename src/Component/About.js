import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Component/Footer";
import soniyaPhoto from "../image/Soniya-pic.jpeg";

// TODO: replace with Soniya's real numbers and city before launch
const STATS = [
  { value: "10+", label: "Years designing" },
  { value: "60+", label: "Homes completed" },
];

const About = () => {
  return (
    <>
      <section className="about">
        <Container>
          <Row className="gx-lg-5 gy-5">
            <Col md={5}>
              <img
                src={soniyaPhoto}
                alt="Soniya, lead designer at Sparkle Design Studio"
                className="about-photo"
                loading="lazy"
              />
            </Col>
            <Col md={7} className="about-copy">
              <p className="eyebrow">The studio</p>
              <h2>Hello, I'm Soniya.</h2>
              <p className="about-lead">
                I design homes that feel warm, personal and easy to live in.
              </p>
              <p>
                At Sparkle Design Studio, I bring together two things I love:
                the richness of traditional craft and the calm simplicity of
                modern design. The result is a home that feels rooted, but works
                for the way you live today.
              </p>
              <p>
                I work on residential and commercial projects with a small team,
                and I stay hands-on from start to finish — from the first
                conversation and space plan to choosing finishes and checking
                the last details on site.
              </p>

              <dl className="about-stats">
                {STATS.map((s) => (
                  <div key={s.label} className="about-stat">
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>

              {/* TODO: draft quote — confirm wording with Soniya before launch */}
              <figure className="about-quote">
                <blockquote>
                  <p>
                    A home should feel like you the moment you walk in — not
                    like a showroom.
                  </p>
                </blockquote>
                <figcaption>Soniya, Sparkle Design Studio</figcaption>
              </figure>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default About;
