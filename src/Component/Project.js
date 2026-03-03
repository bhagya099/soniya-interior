import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import projects from "../data/projects";
import Footer from "./Footer";

const Project = () => {
  const [filter, setFilter] = useState("All");

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

        <Row xs={1} sm={2} md={3} className="g-4">
          {projects
            .filter((p) => (filter === "All" ? true : p.category === filter))
            .map((p) => (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm project-card">
                  <Link to={`/project/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Card.Img variant="top" src={p.image} alt={p.title} />
                    <Card.Body>
                      <Card.Title>{p.title}</Card.Title>
                      <Card.Text>{p.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{p.category}</small>
                    </Card.Footer>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Project;
