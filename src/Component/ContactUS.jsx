import React, { useState } from "react";
import Footer from "../Component/Footer";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import emailConfig from "../emailConfig";
import contactImage from "../image/contact-image.jpeg";

const WHATSAPP_URL = "https://wa.me/918805989342";
const PROJECT_TYPES = ["Full home", "Living room", "Kitchen", "Bedroom", "Pooja room", "Other"];

const initialForm = { from_name: "", phone: "", from_email: "", project_type: "", message: "" };
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
        // project_brief keeps the current EmailJS template filled until it's
        // updated to use {{project_type}}
        { ...form, project_brief: form.project_type },
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
      <section className="contact">
        <Container>
          <Row className="gx-lg-5 gy-5">
            <Col lg={5}>
              <div className="img-reveal">
                <img
                  src={contactImage}
                  alt="Dining room crockery unit designed by Sparkle Design Studio"
                  className="contact-photo"
                />
              </div>
            </Col>
            <Col lg={7}>
              <div className="contact-intro" data-reveal>
                <p className="eyebrow">Start a project</p>
                <h2>Get in touch</h2>
                <p className="text-muted">
                  Tell us about your home and what you'd like to change. We usually reply within a day.
                </p>
              </div>

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

                <Form.Group controlId="contact-name" className="contact-field">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="from_name"
                    autoComplete="name"
                    value={form.from_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Row className="gx-4">
                  <Col sm={6}>
                    <Form.Group controlId="contact-phone" className="contact-field">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="contact-email" className="contact-field">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="from_email"
                        autoComplete="email"
                        value={form.from_email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="contact-project-type" className="contact-field">
                  <Form.Label>Project type</Form.Label>
                  <Form.Select name="project_type" value={form.project_type} onChange={handleChange}>
                    <option value="">Select one</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="contact-message" className="contact-field">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="contact-actions">
                  <Button variant="primary" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Button>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-tan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4L3 21z" />
                      <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1-1.2 1.8.8-.3 1.6c-3.8.4-7.6-3.4-7.2-7.2l1.6-.3.8 1.8L9 9.5z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
