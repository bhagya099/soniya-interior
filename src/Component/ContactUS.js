import React, { useState } from "react";
import Footer from "../Component/Footer";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import emailConfig from "../emailConfig";

const initialForm = { from_name: "", from_email: "", project_brief: "", message: "" };
const isConfigured = () =>
  !Object.values(emailConfig).some((v) => String(v).startsWith("YOUR_"));

export default function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.from_name || !form.from_email || !form.message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and a message before sending.");
      return;
    }

    if (!isConfigured()) {
      setStatus("error");
      setErrorMsg(
        "The contact form isn't connected to an email service yet. See src/emailConfig.js for setup steps."
      );
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(
        emailConfig.SERVICE_ID,
        emailConfig.TEMPLATE_ID,
        form,
        { publicKey: emailConfig.PUBLIC_KEY }
      );
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("EmailJS send failed:", err);
      setStatus("error");
      const detail = err && (err.text || err.message);
      setErrorMsg(
        detail
          ? `Send failed: ${detail}`
          : "Something went wrong sending your message. Please try again or email us directly."
      );
    }
  };

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
                <p className="mb-1">Email: <a href="mailto:sparkledesignstudio7@gmail.com">sparkledesignstudio7@gmail.com</a></p>
                <p>Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
                <p className="text-muted">Studio: By appointment only</p>
              </div>
            </Col>
            <Col md={7}>
              <div className="contact-card">
                <Form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {status === "success" && (
                    <Alert variant="success" onClose={() => setStatus("idle")} dismissible>
                      Thanks! Your message has been sent — we'll be in touch soon.
                    </Alert>
                  )}
                  {status === "error" && (
                    <Alert variant="danger" onClose={() => setStatus("idle")} dismissible>
                      {errorMsg}
                    </Alert>
                  )}
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Control
                        type="text"
                        name="from_name"
                        placeholder="Your name"
                        value={form.from_name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Control
                        type="email"
                        name="from_email"
                        placeholder="Email"
                        value={form.from_email}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    name="project_brief"
                    placeholder="Project brief (one line)"
                    value={form.project_brief}
                    onChange={handleChange}
                  />
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Tell us more about your project"
                    className="mb-3"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" disabled={status === "sending"}>
                      {status === "sending" ? "Sending…" : "Send message"}
                    </Button>
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
