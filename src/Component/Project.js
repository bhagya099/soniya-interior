import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import projects, { ROOMS } from "../data/projects";
import Footer from "./Footer";
import Lightbox from "./Lightbox";

// Rooms with a single photo don't make a convincing portfolio entry yet
const MIN_PHOTOS = 2;
const visibleProjects = projects.filter((p) => p.images.length >= MIN_PHOTOS);

const Project = () => {
  const [searchParams] = useSearchParams();
  const roomFromSlug = visibleProjects.find((p) => p.slug === searchParams.get("room"))?.room;
  const [activeRoom, setActiveRoom] = useState(roomFromSlug || "All");
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const availableRooms = useMemo(
    () => ROOMS.filter((r) => visibleProjects.some((p) => p.room === r)),
    []
  );

  const activeProject = useMemo(
    () => (activeRoom === "All" ? null : visibleProjects.find((p) => p.room === activeRoom)),
    [activeRoom]
  );

  // On mobile the tabs scroll sideways; keep the active one in view
  // (scrollLeft only, so the page itself never jumps vertically)
  const filterRef = useRef(null);
  useEffect(() => {
    const strip = filterRef.current;
    const tab = strip?.querySelector(".room-tab.active");
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollLeft = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
  }, [activeRoom]);

  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  return (
    <>
      <section className="projects">
        <Container>
          <header className="projects-header" data-reveal>
            <p className="eyebrow">Portfolio</p>
            <h2>Our Projects</h2>
            <p className="text-muted mb-0">A selection of homes we've shaped, room by room.</p>
          </header>

          <div className="projects-filter" role="group" aria-label="Filter by room" ref={filterRef}>
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
              {visibleProjects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className="portfolio-item img-reveal"
                  data-reveal
                  style={{ "--i": i }}
                  onClick={() => setActiveRoom(p.room)}
                >
                  <img src={p.image} alt={`${p.title} designed by Sparkle Design Studio`} loading="lazy" />
                  <span className="portfolio-caption">
                    <span className="portfolio-title">{p.title}</span>
                    <span className="portfolio-more">
                      View {p.images.length} photos <span aria-hidden="true">→</span>
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
                      className="portfolio-item img-reveal"
                      data-reveal
                      style={{ "--i": i }}
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
