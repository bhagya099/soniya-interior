import { Nav, Container, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import IMAGES from "../image/img";

const NavComp = () => {
  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById("responsive-navbar-nav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" className="shadow-sm mb-1 navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={IMAGES.logo} alt="logo" className="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav onClick={handleLinkClick}>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/project">
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
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
