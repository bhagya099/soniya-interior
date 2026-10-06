import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import projects, { ROOMS } from "../data/projects";
import Footer from "./Footer";
import Lightbox from "./Lightbox";

const Project = () => {
  const [searchParams] = useSearchParams();
  const roomFromSlug = projects.find((p) => p.slug === searchParams.get("room"))?.room;
  const [activeRoom, setActiveRoom] = useState(roomFromSlug || "All");
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
      <section className="projects">
        <Container>
          <header className="projects-header">
            <p className="eyebrow">Portfolio</p>
            <h2>Our Projects</h2>
            <p className="text-muted mb-0">Browse by room — living room, bedroom, kitchen, and more.</p>
          </header>

          <div className="projects-filter" role="group" aria-label="Filter by room">
            {["All", ...availableRooms].map((room) => (
              <button
                key={room}
                type="button"
                aria-pressed={activeRoom === room}
                className={`room-tab${activeRoom === room ? " active" : ""}`}
                onClick={() => setActiveRoom(room)}
              >
                {room === "All" ? "All Rooms" : room}
              </button>
            ))}
          </div>

          {activeRoom === "All" ? (
            <div className="portfolio-grid">
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="portfolio-item"
                  onClick={() => setActiveRoom(p.room)}
                >
                  <img src={p.image} alt={`${p.title} designed by Sparkle Design Studio`} loading="lazy" />
                  <span className="portfolio-caption">
                    <span className="portfolio-title">{p.title}</span>
                    <span className="portfolio-count">
                      {p.images.length} {p.images.length === 1 ? "photo" : "photos"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            activeProject && (
              <>
                <p className="text-center text-muted mb-4">{activeProject.description}</p>
                <div className="portfolio-grid">
                  {activeProject.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      className="portfolio-item"
                      onClick={() => openLightbox(activeProject.images, i)}
                    >
                      <img
                        src={img}
                        alt={`${activeProject.title}, ${i + 1} of ${activeProject.images.length}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </>
            )
          )}
        </Container>
      </section>

      {showLightbox && (
        <Lightbox images={lightboxImages} startIndex={lightboxIndex} title={activeProject?.title} onClose={() => setShowLightbox(false)} />
      )}

      <Footer />
    </>
  );
};

export default Project;
