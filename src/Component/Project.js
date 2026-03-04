import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import projects from "../data/projects";
import Footer from "./Footer";
import Lightbox from "./Lightbox";

const Project = () => {
  const [filter, setFilter] = useState("All");
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <>
      <Container className="mt-4 mb-5">
        <h2 className="text-center mb-4">Our Projects</h2>
        <div className="projects-filter">
          {categories.map((c) => (
            <Button
              key={c}
              variant={filter === c ? "primary" : "outline-primary"}
              size="sm"
              onClick={() => setFilter(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="portfolio-grid">
          {projects
            .filter((p) => (filter === "All" ? true : p.category === filter))
            .map((p) => (
              <div key={p.id} className="portfolio-item" onClick={() => { setLightboxImages(p.images || [p.image]); setLightboxIndex(0); setShowLightbox(true); }}>
                <div className="portfolio-media">
                  <img src={p.image} alt={p.title} />
                  <div className="overlay">
                    <div className="overlay-text">
                      <h5>{p.title}</h5>
                      <small>{p.category}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>

      {showLightbox && (
        <Lightbox images={lightboxImages} startIndex={lightboxIndex} onClose={() => setShowLightbox(false)} />
      )}

      <Footer />
    </>
  );
};

export default Project;
