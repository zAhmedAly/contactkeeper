import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../context/auth/AuthContext";

import {
  FaUserPlus,
  FaAddressBook,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      fixed="top"
      defaultExpanded="false"
    >
      <Container
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LinkContainer
          to="/"
          style={{
            color: "white",
          }}
        >
          <Navbar.Brand>
            <FaAddressBook /> Contact Keeper
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
          {user && (
            <Navbar.Text
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              Welcome {user.name}
            </Navbar.Text>
          )}
          <Nav className="ml-auto">
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
                onClick={onLogout}
                href="#!"
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
