import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  ADD_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS_REQUEST:
      return { ...state, loading: true };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(action.payload);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ADD_CONTACT_REQUEST:
      return { ...state, addLoading: true };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        filtered:
          state.filtered !== null ? [action.payload, ...state.filtered] : null,
        addLoading: false,
      };
    case ADD_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        addLoading: false,
      };
    case DELETE_CONTACT_REQUEST:
      return { ...state, deleteLoading: true };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => action.payload !== contact.id
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.filter((contact) => action.payload !== contact.id)
            : null,
        deleteLoading: false,
      };
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        deleteLoading: false,
      };
    case UPDATE_CONTACT_REQUEST:
      return { ...state, addLoading: true };
    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.map((contact) =>
                contact.id === action.payload.id ? action.payload : contact
              )
            : null,
        addLoading: false,
      };
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        addLoading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
