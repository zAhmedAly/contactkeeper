import React, { useState, useContext } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import ContactContext from './context/contact/ContactContext';

const AddEditContact = () => {
  const [contact, setContact] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const { contacts, addLoading, addContact } = contactContext;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    clearForm();
  };

  const clearForm = () => {
    setContact({
      id: '',
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <>
      <h2 className='my-2' style={{ color: 'darkblue', textAlign: 'center' }}>
        <strong>Add Contact</strong>
      </h2>
      <Card className='mb-3'>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='formBasicContactName'>
              <Form.Label>Contact Name *</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={name}
                placeholder='Enter contact name'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                placeholder='user@example.com'
                onChange={onChange}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formBasicPhone'>
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                value={phone}
                placeholder='Phone number xxx-xxx-xxxx'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Label className='mr-4'>Contact Type </Form.Label>
              <Form.Check
                inline
                type='radio'
                label='Personal'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='Professional'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='btn-block'
              disabled={!name || !email || !phone}
            >
              {addLoading ? (
                <>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />{' '}
                  Saving ...
                </>
              ) : (
                'Add Contact'
              )}
            </Button>

            <Button variant='light' className='btn-block' onClick={clearForm}>
              Clear
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddEditContact;
