import React, { Fragment, useContext, useState } from 'react';
import classes from './ContactsItem.module.css';
import { ContactContxt } from '../store/contacts-context';

const ContactsItem = ({ contact: { name, phone, email, type, id } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState({
    id,
    name,
    email,
    phone,
    type,
  });

  const { removeContact, updateContact } = useContext(ContactContxt);

  const deleteFn = (id) => {
    removeContact(id);
  };

  const editFn = (id, newValue) => {
    setIsEditing(!isEditing);
    updateContact(id, newValue);
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes['grid-2']}>
      <div className={classes.card}>
        <ul>
          <li>
            <i className="fas fa-file-signature" /> {'  '}Name:{' '}
            <span>{name}</span> <br />
            {isEditing && (
              <input value={value.name} onChange={onChange} name="name" />
            )}
          </li>
          <li className={classes.icons}>
            <i className="fas fa-mobile-alt" /> {'  '}
            Phone: {'  '}
            <span>{phone}</span> <br />
            {isEditing && (
              <input value={value.phone} onChange={onChange} name="phone" />
            )}
          </li>
          <li className={classes.icon}>
            <i className="far fa-envelope" />
            {'  '} E-mail:
            <span>{email}</span>
            <br />
            {isEditing && (
              <input value={value.email} onChange={onChange} name="email" />
            )}
          </li>
          <li>
            <i class="far fa-address-card" /> Type:{' '}
            <b className={classes.type}>{type}</b> <br />
            {isEditing && (
              <Fragment>
                <input
                  name="type"
                  type="radio"
                  value="personal"
                  onChange={onChange}
                  id="personal"
                  checked={value.type === 'personal'}
                />{' '}
                Personal
                <input
                  name="type"
                  type="radio"
                  value="professional"
                  onChange={onChange}
                  id="professional"
                  checked={value.type === 'professional'}
                />{' '}
                Professional
              </Fragment>
            )}
          </li>

          {!isEditing ? (
            <li>
              <button onClick={() => deleteFn(id)}>DELETE</button>
              <button onClick={() => setIsEditing(true)}>EDIT</button>
            </li>
          ) : (
            <button onClick={() => editFn(id, value)}>Update</button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactsItem;
