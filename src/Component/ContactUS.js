import React from "react";
import Footer from "../Component/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function ContactUs() {
  return (
    <>
      <section className="contact-hero">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2>Get in touch</h2>
              <p className="text-muted">Tell us about your project and we'll get back within 48 hours.</p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={5}>
              <div className="contact-card">
                <h5>Contact</h5>
                <p className="mb-1">Email: <a href="mailto:bhagyashree096@gmail.com">bhagyashree096@gmail.com</a></p>
                <p>Phone: +91 98765 43210</p>
                <p className="text-muted">Studio: By appointment only</p>
              </div>
            </Col>
            <Col md={7}>
              <div className="contact-card">
                <Form className="contact-form">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Control type="text" placeholder="Your name" />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Control type="email" placeholder="Email" />
                    </Col>
                  </Row>
                  <Form.Control className="mb-3" type="text" placeholder="Project brief (one line)" />
                  <Form.Control as="textarea" rows={4} placeholder="Tell us more about your project" className="mb-3" />
                  <div className="d-flex justify-content-end">
                    <Button variant="primary">Send message</Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
