import React from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "./Footer";
import Lightbox from "./Lightbox";
import { useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => String(p.id) === String(id));

  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
            <img src={project.image} alt={project.title} className="img-fluid rounded shadow mb-3" />
            <div className="d-flex flex-wrap gap-2">
              {(project.images || [project.image]).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={project.title + " " + (i + 1)}
                  className="img-thumbnail"
                  style={{ width: 120, height: 80, objectFit: "cover", cursor: "pointer" }}
                  onClick={() => { setLightboxIndex(i); setShowLightbox(true); }}
                />
              ))}
            </div>
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
      {showLightbox && (
        <Lightbox images={project.images || [project.image]} startIndex={lightboxIndex} onClose={() => setShowLightbox(false)} />
      )}
      <Footer />
    </>
  );
};

export default ProjectDetail;
