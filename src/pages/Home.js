import React from 'react';
import ContactsForm from '../components/ContactsForm';
import classes from './Home.module.css';
import ContactsList from '../components/ContactsList';

const Home = () => {
  return (
    <div className={classes.Home}>
      <ContactsForm />
      <ContactsList />
    </div>
  );
};

export default Home;
