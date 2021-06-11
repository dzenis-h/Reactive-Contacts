import React from 'react';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <i className="far fa-address-book fa-2x" />
      <p>Reactive Contacts</p>
    </div>
  );
};

export default Navbar;
