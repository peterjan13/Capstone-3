import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext.js";
import customIcon from "../assets/menu5.svg";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  // Function to handle collapsing the Navbar when an item is clicked
  const handleNavItemClick = () => {
    setExpanded(false);
  };

  // Function to handle collapsing the Navbar when clicking outside of it
  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  // Add a click event listener to the document body
  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Navbar expand="lg" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand
          className="textWhite nav-link"
          as={Link}
          to="/"
          onClick={() => setExpanded(!expanded)}
        >
          MATRIXX
        </Navbar.Brand>

        <Navbar.Toggle
          className="textWhite"
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          <img src={customIcon} alt="Toggle navigation" />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem
              to="/"
              label="Home"
              onClick={handleNavItemClick}
              className="nav-link"
            />
            <NavItem
              to="/products"
              label="Products"
              onClick={handleNavItemClick}
              className="nav-link"
            />
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  {/* Admin links */}
                  <Nav.Link
                    as={NavLink}
                    to="/products/add"
                    className="nav-link"
                  >
                    Add-Product
                  </Nav.Link>
                  <NavItem
                    to="/admin/all-orders"
                    label="All-Orders"
                    onClick={handleNavItemClick}
                    className="nav-link"
                  />
                  <NavItem
                    to="/logout"
                    label="Logout"
                    onClick={handleNavItemClick}
                    className="nav-link"
                  />
                </>
              ) : (
                <>
                  {/* Non-admin user links */}
                  <NavItem
                    to="/profile"
                    label="Profile"
                    onClick={handleNavItemClick}
                    className="nav-link"
                  />
                  <NavItem
                    to="/user-orders"
                    label="My-Orders"
                    onClick={handleNavItemClick}
                    className="nav-link"
                  />
                  <NavItem
                    to="/logout"
                    label="Logout"
                    onClick={handleNavItemClick}
                    className="nav-link"
                  />
                </>
              )
            ) : (
              <>
                {/* Public links */}
                <NavItem
                  to="/register"
                  label="Register"
                  onClick={handleNavItemClick}
                  className="nav-link"
                />
                <NavItem
                  to="/login"
                  label="Login"
                  onClick={handleNavItemClick}
                  className="nav-link"
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function NavItem({ to, label, onClick }) {
  return (
    <Nav.Link as={NavLink} to={to} onClick={onClick}>
      {label}
    </Nav.Link>
  );
}
