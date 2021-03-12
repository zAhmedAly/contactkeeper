import React, { useContext, useEffect } from "react";
import { Badge } from "react-bootstrap";
import ContactItem from "./ContactItem";
import ContactContext from "../context/contact/ContactContext";
import SearchContacts from "./SearchContacts";
import Alerts from "./Alerts";
import AlertContext from "../context/alert/AlertContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {
    contacts,
    filtered,
    getContacts,
    clearContacts,
    contactsLoading,
    error,
    clearErrors,
    message,
    clearMessages,
  } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearErrors();
      clearContacts();
    } else if (message) {
      console.log("MESSAGE = ", message);
      setAlert(message, "success");
      clearMessages();
    }

    // eslint-disable-next-line
  }, [error, message]);

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h3
        style={{
          color: "darkblue",
          fontWeight: "bold",
          alignContent: "center",
          justifyContent: "center",
          margin: "0.5rem 0",
        }}
      >
        {" "}
        <strong> Your Contacts</strong>
        {/* {!contactsLoading && (
          <Badge
            style={{
              float: "right",
              padding: "0.3rem 0.7rem",
              textAlign: "center",
              alignContent: "center",
              justifyContent: "center",
              margin: " 0.3rem",
              borderRadius: "5px",
              // height: "1rem",
              fontSize: "1rem",
            }}
            variant="info"
            as="div"
          >
            {filtered !== null
              ? `${filtered.length} Contacts`
              : `${contacts.length} Contacts`}
          </Badge>
        )} */}
      </h3>

      <SearchContacts />
      {!contactsLoading && <Alerts />}

      {!contactsLoading &&
        (contacts !== null && contacts.length > 0 ? (
          filtered !== null ? (
            filtered.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          ) : (
            contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          )
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              marginTop: "10%",
            }}
          >
            {" "}
            <span>No Contacts, Please add a contact</span>
          </div>
        ))}

      {/* {!contactsLoading ? (
        contacts !== null && contacts.length > 0 ? (
          filtered !== null ? (
            filtered.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          ) : (
            contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          )
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              marginTop: "10%",
            }}
          >
            {" "}
            <span>No Contacts, Please add a contact</span>
          </div>
        )
      ) : (
        <div id="cover-spin"></div>

        // <div
        //   style={{
        //     display: "flex",
        //     justifyContent: "center",
        //     alignitems: "center",
        //     height: "100%",
        //     marginTop: "25%",
        //   }}
        // >
        //   <Spinner animation="border" role="status">
        //     <span className="sr-only">Loading...</span>
        //   </Spinner>
        // </div>
      )} */}
    </>
  );
};

export default Contacts;
