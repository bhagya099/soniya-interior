import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import projects, { ROOMS } from "../data/projects";
import Footer from "./Footer";
import Lightbox from "./Lightbox";

const Project = () => {
  const [activeRoom, setActiveRoom] = useState("All");
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const availableRooms = useMemo(
    () => ROOMS.filter((r) => projects.some((p) => p.room === r)),
    []
  );

  const activeProject = useMemo(
    () => (activeRoom === "All" ? null : projects.find((p) => p.room === activeRoom)),
    [activeRoom]
  );

  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  return (
    <>
      <section className="projects-hero">
        <Container className="text-center">
          <h2>Our Projects</h2>
          <p className="text-muted">Browse by room — living room, bedroom, kitchen, and more.</p>
        </Container>
      </section>

      <Container className="mb-5">
        <div className="projects-filter" role="tablist" aria-label="Filter by room">
          <button
            type="button"
            className={`room-pill ${activeRoom === "All" ? "active" : ""}`}
            onClick={() => setActiveRoom("All")}
          >
            All Rooms
          </button>
          {availableRooms.map((room) => (
            <button
              key={room}
              type="button"
              className={`room-pill ${activeRoom === room ? "active" : ""}`}
              onClick={() => setActiveRoom(room)}
            >
              {room}
            </button>
          ))}
        </div>

        {activeRoom === "All" ? (
          <div className="portfolio-grid">
            {projects.map((p) => (
              <div
                key={p.id}
                className="portfolio-item"
                role="button"
                tabIndex={0}
                onClick={() => setActiveRoom(p.room)}
                onKeyDown={(e) => (e.key === "Enter" ? setActiveRoom(p.room) : null)}
              >
                <div className="portfolio-media mosaic">
                  <div className="mosaic-grid" aria-hidden>
                    {p.images.slice(0, 3).map((imgThumb, ti) => (
                      <img
                        key={ti}
                        src={imgThumb}
                        alt={p.title + " " + (ti + 1)}
                        className="mosaic-thumb"
                      />
                    ))}
                  </div>
                  {p.images.length > 1 && (
                    <span
                      className="image-count-badge"
                      title={`This room has ${p.images.length} photos`}
                    >
                      +{p.images.length - 1}
                    </span>
                  )}
                  <div className="overlay">
                    <div className="overlay-text">
                      <h5>{p.title}</h5>
                      <small>{p.images.length} photos</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {activeProject && (
              <>
                <p className="text-center text-muted mb-4">{activeProject.description}</p>
                <div className="portfolio-grid">
                  {activeProject.images.map((img, i) => (
                    <div
                      key={i}
                      className="portfolio-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => openLightbox(activeProject.images, i)}
                      onKeyDown={(e) => (e.key === "Enter" ? openLightbox(activeProject.images, i) : null)}
                    >
                      <div className="portfolio-media">
                        <img src={img} alt={`${activeProject.title} ${i + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </Container>

      {showLightbox && (
        <Lightbox images={lightboxImages} startIndex={lightboxIndex} onClose={() => setShowLightbox(false)} />
      )}

      <Footer />
    </>
  );
};

export default Project;
