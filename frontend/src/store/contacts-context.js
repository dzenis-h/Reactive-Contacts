import { createContext, useReducer, useCallback } from 'react';
import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACTS,
} from './types';
import axios from 'axios';
import setToken from '../utils/setToken';

export const ContactContxt = createContext({
  contacts: [],
  addContect: (contact) => {},
  removeContact: (id) => {},
  updateContact: (id, newData) => {},
  getContacts: () => {},
});

const initialState = {
  contacts: [],
};

const reducerFn = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const updatedContacts = state.contacts.concat(action.payload);
      return {
        ...state,
        contacts: updatedContacts,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case REMOVE_CONTACT:
      const updContacts = state.contacts.filter(
        (c) => c._id !== action.payload
      );
      return {
        ...state,
        contacts: updContacts,
      };
    case UPDATE_CONTACT:
      const existingIndex = state.contacts.findIndex(
        (c) => c._id === action.payload.id
      );
      let existingItem = state.contacts[existingIndex];
      existingItem = action.payload.newData;
      let updatedItems = [...state.contacts];
      updatedItems[existingIndex] = existingItem;
      return {
        ...state,
        contacts: updatedItems,
      };

    default:
      return state;
  }
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const ContactProvider = (props) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getContacts = useCallback(async () => {
    setToken(localStorage.token);
    const { data } = await axios.get('api/contacts');
    dispatch({ type: GET_CONTACTS, payload: data });
  }, []);

  const addContect = async (contact) => {
    setToken(localStorage.token);
    const { data } = await axios.post('api/contacts', contact, config);
    dispatch({ type: ADD_CONTACT, payload: data });
  };

  const removeContact = async (id) => {
    await axios.delete(`api/contacts/${id}`);
    dispatch({ type: REMOVE_CONTACT, payload: id });
  };

  const updateContact = async (id, newData) => {
    await axios.put(`api/contacts/${id}`, newData, config);
    dispatch({ type: UPDATE_CONTACT, payload: { id, newData } });
  };

  const ctx = {
    contacts: state.contacts,
    addContect,
    removeContact,
    updateContact,
    getContacts,
  };

  return (
    <ContactContxt.Provider value={ctx}>
      {props.children}
    </ContactContxt.Provider>
  );
};
