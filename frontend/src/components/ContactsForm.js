import React, { useState, useContext } from 'react';
import classes from './ContactsForm.module.css';
import { ContactContxt } from '../store/contacts-context';
import { v4 as uuid } from 'uuid';

const ContactsForm = (props) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { addContect } = useContext(ContactContxt);

  const { name, phone, email, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addContect({ id: uuid(), ...contact });
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={onSubmit} className={classes.ContactsForm}>
      <label htmlFor={name}>
        <b>Name:</b>
      </label>
      <input
        name="name"
        type="text"
        value={name}
        onChange={onChange}
        id="name"
        required
      />
      <label htmlFor={email}>
        <b>Email:</b>
      </label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={onChange}
        id="email"
        required
      />
      <label htmlFor={phone}>
        <b>Phone:</b>
      </label>
      <input
        name="phone"
        type="text"
        value={phone}
        onChange={onChange}
        id="phone"
        required
      />
      <label htmlFor={type}>
        <b>Type:</b>
      </label>
      <div className={classes.type}>
        <input
          name="type"
          type="radio"
          value="personal"
          onChange={onChange}
          id="personal"
          checked={type === 'personal'}
        />{' '}
        Personal
        <input
          name="type"
          type="radio"
          value="professional"
          onChange={onChange}
          id="professional"
          checked={type === 'professional'}
        />{' '}
        Professional
      </div>
      <button>Add Contact</button>
    </form>
  );
};

export default ContactsForm;
