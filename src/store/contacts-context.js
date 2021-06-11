import { createContext, useReducer } from 'react';
import { ADD_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT } from './types';

export const ContactContxt = createContext({
  contacts: [],
  addContect: (contact) => {},
  removeContact: (id) => {},
  updateContact: (id, newData) => {},
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
    case REMOVE_CONTACT:
      const updContacts = state.contacts.filter((c) => c.id !== action.payload);
      return {
        ...state,
        contacts: updContacts,
      };
    case UPDATE_CONTACT:
      const existingIndex = state.contacts.findIndex(
        (c) => c.id === action.payload.id
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

export const ContactProvider = (props) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const addContect = (contact) => {
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const removeContact = (id) => {
    dispatch({ type: REMOVE_CONTACT, payload: id });
  };

  const updateContact = (id, newData) => {
    dispatch({ type: UPDATE_CONTACT, payload: { id, newData } });
  };

  const ctx = {
    contacts: state.contacts,
    addContect,
    removeContact,
    updateContact,
  };

  return (
    <ContactContxt.Provider value={ctx}>
      {props.children}
    </ContactContxt.Provider>
  );
};
