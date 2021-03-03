import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../context/auth/AuthContext";

import {
  FaUserPlus,
  FaAddressBook,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      fixed="top"
      defaultExpanded="false"
    >
      <Container>
        <LinkContainer
          to="/"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Navbar.Brand>
            <FaAddressBook /> Contact Keeper
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
          <Nav className="ml-auto">
            {isAuthenticated && (
              <LinkContainer
                to="/"
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Nav.Link>
                  <FaHome /> Home
                </Nav.Link>
              </LinkContainer>
            )}

            <LinkContainer
              to="/about"
              style={{ color: "white", display: "flex", alignItems: "center" }}
            >
              <Nav.Link>About</Nav.Link>
            </LinkContainer>

            {!isAuthenticated && (
              <>
                <LinkContainer
                  to="/login"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Nav.Link>
                    <FaSignInAlt /> Login
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer
                  to="/register"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Nav.Link>
                    <FaUserPlus /> Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {isAuthenticated && (
              <Nav.Link
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
                href="#logout"
              >
                <FaSignOutAlt />
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
