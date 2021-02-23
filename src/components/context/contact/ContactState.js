import { useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import AlertContext from "../alert/AlertContext";

import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "../types";

const ContactState = (props) => {
  const data = [
    {
      id: uuidv4(),
      name: "Ahmed Aly",
      email: "ahmed@gmail.com",
      phone: "818-970-9072",
      type: "personal",
    },
    {
      id: uuidv4(),
      name: "Edward Yue",
      email: "edward@gmail.com",
      phone: "302-387-0987",
      type: "professional",
    },
    {
      id: uuidv4(),
      name: "Reham Kassem",
      email: "reham@gmail.com",
      phone: "818-731-0560",
      type: "personal",
    },
    {
      id: uuidv4(),
      name: "Habiba Aly",
      email: "habiba@gmail.com",
      phone: "661-259-3893",
      type: "personal",
    },
  ];

  const initialState = {
    contacts: data,
    filtered: null,
    current: null,
    error: null,
    loading: false,
    addLoading: false,
    deleteLoading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const getContacts = () => {
    dispatch({ type: GET_CONTACTS_REQUEST });
    try {
      setTimeout(() => {
        dispatch({
          type: GET_CONTACTS_SUCCESS,
          payload: data,
        });
      }, 1000);
    } catch (error) {
      dispatch({ type: GET_CONTACTS_FAIL });
    }
  };

  const filterContacts = (keyword) => {
    dispatch({ type: FILTER_CONTACTS, payload: keyword });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT_REQUEST });
    try {
      setTimeout(() => {
        dispatch({
          type: ADD_CONTACT_SUCCESS,
          payload: contact,
        });
        setAlert("Contact Created", "success");
      }, 1000);
    } catch (error) {
      dispatch({ type: ADD_CONTACT_FAIL });
    }
  };

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT_REQUEST });
    try {
      setTimeout(() => {
        dispatch({
          type: DELETE_CONTACT_SUCCESS,
          payload: id,
        });
        setAlert("Contact Deleted", "success");
      }, 1000);
    } catch (error) {
      dispatch({ type: DELETE_CONTACT_FAIL });
    }
  };

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT_REQUEST });
    try {
      setTimeout(() => {
        dispatch({
          type: UPDATE_CONTACT_SUCCESS,
          payload: contact,
        });
        setAlert("Contact Updated", "success");
      }, 1000);
    } catch (error) {
      dispatch({ type: UPDATE_CONTACT_FAIL });
    }
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = (contact) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
        loading: state.loading,
        addLoading: state.addLoading,
        deleteLoading: state.deleteLoading,
        getContacts,
        filterContacts,
        clearFilter,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
