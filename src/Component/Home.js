import React from "react";
import IMAGES from "../image/img.js";
import Footer from "../Component/Footer";
import projects from "../data/projects";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container>
          <Row className="hero-inner align-items-center">
            <Col md={6} className="hero-copy">
              <h1>Beautiful, functional interiors crafted for you</h1>
              <p>
                We design spaces that reflect your lifestyle — from concept to
                completion. Thoughtful materials, tailored layouts and on-time
                delivery.
              </p>
              <Button as={Link} to="/project" className="btn-primary custom-cta">
                View Projects
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="services">
        <Container>
          <h3 className="text-center mb-4">Our Services</h3>
          <Row className="g-4">
            <Col sm={6} md={4}>
              <Card className="service-card p-3">
                <Card.Body>
                  <Card.Title>Space Planning</Card.Title>
                  <Card.Text>Efficient layouts for better living.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4}>
              <Card className="service-card p-3">
                <Card.Body>
                  <Card.Title>3D Renderings</Card.Title>
                  <Card.Text>Photoreal visuals to preview designs.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4}>
              <Card className="service-card p-3">
                <Card.Body>
                  <Card.Title>Project Management</Card.Title>
                  <Card.Text>From procurement to on-site delivery.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="featured-projects mt-4 mb-5">
        <Container>
          <h3 className="text-center mb-3">Featured Projects</h3>
          <Row xs={1} sm={2} md={3} className="g-4">
            {projects.slice(0, 3).map((p) => (
              <Col key={p.id}>
                <Card className="project-card h-100 shadow-sm">
                  <Card.Img variant="top" src={p.image} />
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>{p.description}</Card.Text>
                    <Button as={Link} to="/project" variant="primary" className="custom-cta">
                      See More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
