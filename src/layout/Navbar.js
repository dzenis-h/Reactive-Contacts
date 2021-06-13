import React, { Fragment, useContext, useEffect } from 'react';
import classes from './Navbar.module.css';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

const Navbar = () => {
  const { logout, isAuth, user, token, getUser } = useContext(AuthContext);

  useEffect(() => {
    if (isAuth) getUser(localStorage.token);
  }, [token, isAuth, getUser]);

  return (
    <Fragment>
      <div className={classes.navbar}>
        <Link to="/">
          <i className="far fa-address-book fa-2x" />
          <p className={classes.title}>Reactive Contacts</p>
        </Link>
        <div className={classes['nav-links']}>
          {!isAuth ? (
            <Fragment>
              <p>
                <NavLink to="/register" activeClassName={classes.selected}>
                  Register {'  '}
                </NavLink>
              </p>
              <p>
                <NavLink to="/login" activeClassName={classes.selected}>
                  Login
                </NavLink>
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p className={classes.name}>
                <i className="far fa-hand-peace" />
                Hello, {user && user.name}
              </p>
              <p>
                <a href="#!" onClick={logout} className={classes.logout}>
                  <i className="fas fa-sign-out-alt logout-icon" />
                  <span className={classes.hide}>Logout</span>
                </a>
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
