import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AddEditContact from '../components/AddEditContact';
import Contacts from '../components/Contacts';

const HomeScreen = () => {
  return (
    <Row>
      <Col md={5}>
        <AddEditContact />
      </Col>
      <Col />
      <Col md={5}>
        <Contacts />
      </Col>
    </Row>
  );
};

export default HomeScreen;
