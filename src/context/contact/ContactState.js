import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";

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
    contacts: null,
    filtered: null,
    current: null,
    error: null,
    contactsLoading: false,
    addLoading: false,
    deleteLoading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    dispatch({ type: GET_CONTACTS_REQUEST });
    try {
      const res = await axios.get("/api/contacts");
      console.log("getContacts res = ", res);
      setTimeout(() => {
        dispatch({
          type: GET_CONTACTS_SUCCESS,
          payload: res.data,
        });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: GET_CONTACTS_FAIL, payload: message });
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
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: ADD_CONTACT_FAIL, payload: message });
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
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: DELETE_CONTACT_FAIL, payload: message });
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
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: UPDATE_CONTACT_FAIL, payload: message });
    }
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
        contactsLoading: state.contactsLoading,
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
