import React, { useContext } from "react";
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { FaPhone, FaEnvelopeOpen, FaTrashAlt, FaEdit } from "react-icons/fa";
import ContactContext from "./context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, deleteLoading } = contactContext;

  return (
    <Card
      style={{
        margin: "0.5rem 0",
        padding: "0.5rem 1rem",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* <Card.Body> */}
      <Card.Title style={{ marginBottom: "0" }}>
        <h5
          style={{
            color: "darkblue",
            fontWeight: "bold",
            alignContent: "center",
            justifyContent: "center",
            margin: "0.5rem 0",
          }}
        >
          {contact.name}{" "}
          <Badge
            style={{
              float: "right",
              padding: "auto 0.7rem",
              textAlign: "center",
              alignContent: "center",
              justifyContent: "center",
              margin: "0 0.3rem",
              borderRadius: "5px",
              height: "1.3rem",
              fontSize: "0.8rem",
              verticalAlign: "middle",
            }}
            variant={contact.type === "professional" ? "success" : "primary"}
          >
            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
          </Badge>
        </h5>
      </Card.Title>

      <Card.Text style={{ marginBottom: "0.5rem" }}>
        <FaEnvelopeOpen /> {contact.email}
      </Card.Text>
      <Card.Text style={{ marginBottom: "0.5rem" }}>
        <FaPhone /> {contact.phone}
      </Card.Text>
      <div style={{ marginBottom: "0.5rem" }}>
        <Button
          variant="primary"
          size="sm"
          style={{ margin: "0 0.2rem" }}
          // onClick={() => setContactForEdit(contact)}
        >
          <FaEdit />
          {/* <strong>Edit</strong> */}
        </Button>
        <Button
          variant="danger"
          size="sm"
          disabled={deleteLoading}
          onClick={() => {
            deleteContact(contact.id);
          }}
        >
          <FaTrashAlt />
          {/* // <strong>Delete</strong> */}
        </Button>
      </div>
      {/* </Card.Body> */}
    </Card>
  );
};

export default ContactItem;
