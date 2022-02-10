import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../Types';

function ContactState(props) {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '333-333-3333',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  function addContact(contact) {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  }
  // Delete Contact
  function deleteContact(id) {
    dispatch({ type: DELETE_CONTACT, payload: id });
  }

  // Set Current Contact
  function setCurrent(contact) {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  // Clear Current Contact
  function clearCurrent() {
    dispatch({ type: CLEAR_CURRENT });
  }

  // Update Contact
  function updateContact(contact) {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  }

  // Filter Contacts
  function filterContacts(text) {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  }

  // Clear Filter
  function clearFilter() {
    dispatch({ type: CLEAR_FILTER });
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
