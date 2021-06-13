import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../store/auth-context';
import classes from './Register.module.css';

const Register = ({ history }) => {
  const { login, isAuth } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuth) history.push('/');
  }, [isAuth, history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  const { email, password } = user;

  return (
    <form className={classes.register} onSubmit={onSubmit}>
      <h4>LOGIN</h4>

      <label htmlFor="email">E-mail:</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={onChange}
        required
      />

      <label htmlFor="name">Password:</label>
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        required
      />
      <button>Login</button>
    </form>
  );
};

export default Register;
