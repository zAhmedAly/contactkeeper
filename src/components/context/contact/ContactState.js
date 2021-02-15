import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  FILTER_CONTACTS,
  CLEAR_FILTER,
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
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = () => {
    dispatch({ type: GET_CONTACTS_REQUEST });
    try {
      setTimeout(() => {
        dispatch({
          type: GET_CONTACTS_SUCCESS,
          payload: data,
          loading: false,
        });
      }, 1500);
    } catch (error) {
      dispatch({ type: GET_CONTACTS_FAIL, loading: false });
    }
  };

  const filterContacts = (keyword) => {
    dispatch({ type: FILTER_CONTACTS, payload: keyword });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
