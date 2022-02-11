import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../Types';

function ContactState(props) {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get Contacts
  async function getContacts() {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  }

  // Add Contact
  async function addContact(contact) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  }
  // Delete Contact
  async function deleteContact(id) {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  }

  // Set Current Contact
  function setCurrent(contact) {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  function clearContacts() {
    dispatch({ type: CLEAR_CONTACTS });
  }

  // Clear Current Contact
  function clearCurrent() {
    dispatch({ type: CLEAR_CURRENT });
  }

  // Update Contact
  async function updateContact(contact) {
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact);
      console.log(res);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
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
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
