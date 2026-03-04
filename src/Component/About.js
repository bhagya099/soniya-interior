import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Component/Footer";

const About = () => {
  return (
    <>
      <section className="about-hero">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="about-bio">
              <h2>About Soniya Interior</h2>
              <p className="lead text-muted">Creating warm, considered spaces that feel like home.</p>
              <p>
                Soniya Interior is a boutique interior design studio focused on thoughtful space planning and refined finishes. We blend traditional craft with modern simplicity to deliver timeless interiors.
              </p>
              <p>
                With strengths in residential and commercial projects, Soniya leads a small team that takes a hands-on approach during design and execution.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <img src={require("../image/Soniya_pic.JPG")} alt="Soniya" className="img-fluid about-image shadow" />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default About;
