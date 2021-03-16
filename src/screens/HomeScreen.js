import { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AddEditContact from "../components/AddEditContact";
import Alerts from "../components/Alerts";
import Contacts from "../components/Contacts";
import AuthContext from "../context/auth/AuthContext";
import ContactContext from "../context/contact/ContactContext";

const HomeScreen = () => {
  const contactContext = useContext(ContactContext);
  const { contactsLoading, addLoading, deleteLoading } = contactContext;

  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    console.log("HomeScreen loadUser ....");
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {(contactsLoading || addLoading || deleteLoading) && (
        <div id="cover-spin"></div>
      )}
      <Row>
        <Col />
        <Col lg={5}>{!contactsLoading && <Alerts />}</Col>
        <Col />
      </Row>
      <Row>
        <Col lg={6}>
          <AddEditContact />
        </Col>
        <Col />
        <Col lg={5}>
          <Contacts />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
