import { useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import logo from "../image/logo-trimmed.png";

const NavComp = () => {
  const [expanded, setExpanded] = useState(false);
  const closeMenu = () => setExpanded(false);
  const { pathname } = useLocation();
  useRevealOnScroll(pathname);

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="site-nav"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeMenu} aria-label="Sparkle Design Studio — home">
            <img src={logo} alt="Sparkle Design Studio" className="nav-logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav onClick={closeMenu}>
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/project">
                Projects
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="nav-cta">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};
export default NavComp;
