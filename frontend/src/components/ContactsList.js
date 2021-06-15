import React, { useContext, useEffect, useRef } from 'react';
import { ContactContxt } from '../store/contacts-context';
import { AuthContext } from '../store/auth-context';
import ContactsItem from './ContactsItem';
import classes from './ContactsList.module.css';

const ContactsList = () => {
  const { contacts, getContacts, filtered, filterContacts, clearFiltered } =
    useContext(ContactContxt);
  const { isAuth } = useContext(AuthContext);

  const filterInput = useRef('');

  useEffect(() => {
    if (isAuth) getContacts();
    if (filterInput.current.value === '') clearFiltered();
  }, [isAuth, getContacts, clearFiltered]);

  const onChange = (e) => {
    if (filterInput.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFiltered();
    }
  };

  const list =
    filtered !== null
      ? filtered.map((f) => <ContactsItem contact={f} key={f._id} />)
      : contacts.map((c) => <ContactsItem contact={c} key={c._id} />);

  return (
    <div className={classes.list}>
      <label htmlFor="filter">Filter contacts:</label>
      <input ref={filterInput} name="filter" onChange={onChange} />
      {list}
    </div>
  );
};

export default ContactsList;
