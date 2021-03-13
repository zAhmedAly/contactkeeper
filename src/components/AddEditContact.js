import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ContactContext from "../context/contact/ContactContext";

const AddEditContact = () => {
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const {
    addLoading,
    addContact,
    updateContact,
    current,
    clearCurrent,
  } = contactContext;

  const onChange = (e) => {
    if (e.target.name === "phone") {
      const formattedPhone = handleInput(e.target.value);
      setContact({ ...contact, phone: formattedPhone });
    } else {
      setContact({ ...contact, [e.target.name]: e.target.value });
    }
  };

  useEffect(
    () => {
      if (current !== null) {
        setContact(current);
      } else {
        setContact({
          name: "",
          email: "",
          phone: "",
          type: "personal",
        });
      }
      // }
    },
    // eslint-disable-next-line
    [current]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearForm();
    clearCurrent();
  };

  const clearForm = () => {
    setContact({
      id: "",
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
    clearCurrent();
  };

  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const handleInput = (value) => {
    const newPhone = value.replace(phoneRegex, "($1) $2-$3");
    return newPhone;
  };

  return (
    <>
      <h2 className="my-2" style={{ color: "darkblue", textAlign: "center" }}>
        {current ? (
          <strong>Update Contact</strong>
        ) : (
          <strong>Add Contact</strong>
        )}
      </h2>
      <Card className="mb-3">
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicContactName">
              <Form.Label>Contact Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter contact name"
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
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={handleInput(phone)}
                placeholder="Phone number xxx-xxx-xxxx"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Label className="mr-4">Contact Type </Form.Label>
              <Form.Check
                inline
                type="radio"
                label="Personal"
                name="type"
                value="personal"
                checked={type === "personal"}
                onChange={onChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Professional"
                name="type"
                value="professional"
                checked={type === "professional"}
                onChange={onChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="btn-block"
              disabled={!name || !email || !phone}
            >
              {addLoading ? (
                <>
                  {/* <div id="cover-spin"></div> */}
                  {/* <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "} */}
                  Saving ...
                </>
              ) : current ? (
                "Update Contact"
              ) : (
                "Add Contact"
              )}
              {/* {addLoading && <div id="cover-spin"></div>}
              Add Contact */}
            </Button>
            {current && (
              <Button variant="light" className="btn-block" onClick={clearForm}>
                Clear
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddEditContact;
