import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Alerts from "../components/Alerts";
import AlertContext from "../components/context/alert/AlertContext";
import AuthContext from "../components/context/auth/AuthContext";

const RegisterScreen = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, email, password, cpassword } = registerData;

  const authContext = useContext(AuthContext);
  const { loading, register } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setAlert("Passwords don't match", "danger");
    } else {
      register({ name, email, password });
      clearForm();
    }
  };

  const clearForm = () => {
    setRegisterData({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  return (
    <>
      {loading && <div id="cover-spin"></div>}

      <div style={{ width: "60%", margin: "auto" }}>
        <h2 className="my-2" style={{ color: "darkblue", textAlign: "center" }}>
          <strong>Register User</strong>
        </h2>
        <Alerts />
        <Card className="mb-3">
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicContactName">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter user name"
                  onChange={onChange}
                />
              </Form.Group>
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
              <Form.Group controlId="formBasicCPassword">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                  type="password"
                  name="cpassword"
                  value={cpassword}
                  placeholder="Confirm Password ..."
                  onChange={onChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="btn-block"
                disabled={!name || !email || !password || !cpassword}
              >
                {loading ? "Saving ..." : "Register User"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default RegisterScreen;
