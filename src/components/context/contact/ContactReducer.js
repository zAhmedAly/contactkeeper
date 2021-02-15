import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS_REQUEST:
      return { ...state, loading: true };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(payload);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
