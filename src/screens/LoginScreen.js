import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Alerts from "../components/Alerts";
import AlertContext from "../components/context/alert/AlertContext";
import AuthContext from "../components/context/auth/AuthContext";

const LoginScreen = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const authContext = useContext(AuthContext);
  const { loading, login } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
    // clearForm();
  };

  const clearForm = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {loading && <div id="cover-spin"></div>}
      <Row>
        <Col></Col>
        <Col md={6}>
          <h2
            className="my-2"
            style={{ color: "darkblue", textAlign: "center" }}
          >
            <strong>User Login</strong>
          </h2>
          <Alerts />
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    placeholder="user@example.com"
                    onChange={onChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter Password ..."
                    onChange={onChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-block"
                  disabled={!email || !password}
                >
                  {loading ? "LoggingIn ..." : "User Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      {/* <div style={{ width: "60%", margin: "auto" }}></div> */}
    </>
  );
};

export default LoginScreen;
