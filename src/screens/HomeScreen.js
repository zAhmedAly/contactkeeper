import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AddEditContact from "../components/AddEditContact";
import Contacts from "../components/Contacts";
import ContactContext from "../context/contact/ContactContext";

const HomeScreen = () => {
  const contactContext = useContext(ContactContext);

  const { contactsLoading, addLoading, deleteLoading } = contactContext;

  return (
    <>
      {(contactsLoading || addLoading || deleteLoading) && (
        <div id="cover-spin"></div>
      )}

      <Row>
        <Col md={5}>
          <AddEditContact />
        </Col>
        <Col />
        <Col md={5}>
          <Contacts />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
