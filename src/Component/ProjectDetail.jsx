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
      <section>
        <Container>
          <h2>Project not found</h2>
          <p>The requested project could not be located.</p>
          <Button as={Link} to="/project">Back to projects</Button>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section>
        <Container>
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
                    style={{ height: 80, width: "auto", objectFit: "contain", background: "#efe8dd", cursor: "pointer" }}
                    loading="lazy"
                    onClick={() => { setLightboxIndex(i); setShowLightbox(true); }}
                  />
                ))}
              </div>
            </Col>
            <Col md={5}>
              <p className="eyebrow">Project</p>
              <h2>{project.title}</h2>
              <p className="text-muted">{(project.images || [project.image]).length} photos</p>
              <p>{project.description}</p>
              <Button as={Link} to="/contact" variant="primary" className="mt-2">Contact Us</Button>
              <div className="mt-3">
                <Button as={Link} to="/project" variant="link">Back to projects</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {showLightbox && (
        <Lightbox images={project.images || [project.image]} startIndex={lightboxIndex} title={project.title} onClose={() => setShowLightbox(false)} />
      )}
      <Footer />
    </>
  );
};

export default ProjectDetail;
