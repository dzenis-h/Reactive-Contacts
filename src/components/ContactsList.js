import React, { useContext } from 'react';
import { ContactContxt } from '../store/contacts-context';
import ContactsItem from './ContactsItem';

const ContactsList = () => {
  const { contacts } = useContext(ContactContxt);

  const list = contacts.map((c) => <ContactsItem contact={c} key={c.id} />);

  return <div>{list}</div>;
};

export default ContactsList;
