import React from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "./Footer";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return (
      <Container className="mt-5">
        <h3>Project not found</h3>
        <p>The requested project could not be located.</p>
        <Button as={Link} to="/project">Back to projects</Button>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-4 mb-5">
        <Row>
          <Col md={7}>
            <img src={project.image} alt={project.title} className="img-fluid rounded shadow" />
          </Col>
          <Col md={5}>
            <h2>{project.title}</h2>
            <p className="text-muted">{project.category}</p>
            <p>{project.description}</p>
            <Button as={Link} to="/contact" variant="primary" className="mt-2">Contact Us</Button>
            <div className="mt-3">
              <Button as={Link} to="/project" variant="link">Back to projects</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProjectDetail;
