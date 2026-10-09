import { Suspense, useEffect, useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import logo from "../image/logo-trimmed.png";

const NavComp = () => {
  const [expanded, setExpanded] = useState(false);
  const closeMenu = () => setExpanded(false);
  const { pathname } = useLocation();
  useRevealOnScroll(pathname);
  // Also close on any route change (e.g. the back button), not just menu clicks
  useEffect(() => setExpanded(false), [pathname]);

  // Home: the bar floats transparent over the hero until the page scrolls 60px
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHome) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);
  const transparent = isHome && !scrolled && !expanded;

  return (
    <>
      <Navbar
        expand="lg"
        {...(isHome ? { fixed: "top" } : { sticky: "top" })}
        className={`site-nav${isHome ? " site-nav--overlay" : ""}${transparent ? " is-transparent" : ""}`}
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeMenu} aria-label="Sparkle Design Studio — home">
            <img src={logo} alt="" className="nav-logo" />
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

      {/* Lazy pages: plain cream while a page's code loads, no spinner */}
      <Suspense fallback={<div className="page-fallback" aria-hidden="true" />}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default NavComp;
