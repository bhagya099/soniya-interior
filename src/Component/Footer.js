import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container fluid className="footer-custom">
      <Row>
        <Col md={{ span: 4 }}>
          <h5>Soniya Interior</h5>
          <Link to="/contact" className="d-block mt-2">
            Contact Us
          </Link>
        </Col>
        <Col md={{ span: 4 }} className="text-center">
          <p className="mb-1">Follow us</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-2">Instagram</a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="me-2">Pinterest</a>
        </Col>

        <Col md={{ span: 4 }}>
          <p className="mb-1">Our services</p>
          <ul className="list-unstyled">
            <li>Space Planning</li>
            <li>Design</li>
            <li>3D Renders</li>
            <li>Execution</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
