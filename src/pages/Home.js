import React, { useContext, Fragment } from 'react';
import ContactsForm from '../components/ContactsForm';
import classes from './Home.module.css';
import ContactsList from '../components/ContactsList';
import { AuthContext } from '../store/auth-context';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className={classes.Home}>
      {isAuth ? (
        <Fragment>
          <ContactsForm />
          <ContactsList />
        </Fragment>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Home;
