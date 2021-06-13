import React, { useContext, useEffect } from 'react';
import { ContactContxt } from '../store/contacts-context';
import { AuthContext } from '../store/auth-context';
import ContactsItem from './ContactsItem';

const ContactsList = () => {
  const { contacts, getContacts } = useContext(ContactContxt);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isAuth) getContacts();
  }, [isAuth, getContacts]);

  const list = contacts.map((c) => <ContactsItem contact={c} key={c._id} />);

  return <div>{list}</div>;
};

export default ContactsList;
