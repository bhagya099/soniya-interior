import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function ContactUs() {
  return (
    <Container className="contact mt-5 mb-5">
      <Row className="text-center p-4 mt-5 border-bottom border-dark border-3">
        <h1>Contact with us</h1>
        <p className="m-2">We love to hear from You</p>
      </Row>

      <Row className="p-2 mt-5">
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <h3>Let's Discuss About Your Spaces! </h3>
          <p>
            A descriptive paragraph that tells clients how good you are and
            proves that you are the best choice that they’ve made.
          </p>
          <p>
            This paragraph is also for those who are looking out for a reliable
            interior design firm. Free Consultation Budget Quotations Latest
            Technologies
          </p>
        </Col>
        <Col className="mr-2" xs={{ span: 12 }} md={{ span: 6 }}>
          <Form className="mb-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicphone">
              <Form.Control type="number" placeholder="Mobile Number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicmessage">
              <Form.Control type="text" placeholder="Message" />
            </Form.Group>

            <a
              href="mailto:bhagyashree096@gmail.com"
              className="text-dark me-4"
            >
              Click to Send an Email
            </a>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.333667920497!2d144.7371918!3d-37.899262900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6888137bc50f3%3A0x36edc50fb339888a!2s46%20Tamborine%20Ave%2C%20Point%20Cook%20VIC%203030!5e0!3m2!1sen!2sau!4v1689472734339!5m2!1sen!2sau"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="border-0"
        ></iframe>
      </Row>
    </Container>
  );
}
