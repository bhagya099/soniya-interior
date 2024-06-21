// import { ArrowRight } from "react-bootstrap-icons";
// import IMAGES from "../image/img";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container
      fluid
      className="me-auto p-4 text-center background-color-footer text-color"
    >
      <Row>
        <Col md={{ span: 3 }}>
          <h5>Sparkle Design Studio</h5>
          <Link to="/contact" className="text-white">
            Contact Us
          </Link>
        </Col>
        <Col md={{ span: 3 }}>
          <p>Follow us : Instagram</p>
        </Col>

        <Col md={{ span: 6 }}>
          <p>Our services</p>
          <ul className="list-unstyled">
            <li>Space Planning</li>
            <li>Designing</li>
            <li>3D Render Images</li>
            <li>Execution</li>
            <li>Interior Styling</li>
            <li>Space Decore</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
