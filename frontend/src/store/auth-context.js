import { createContext, useCallback, useReducer } from 'react';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, GET_USER } from './types';
import axios from 'axios';

export const AuthContext = createContext({
  token: null,
  isAuth: null,
  user: null,
  register: (formData) => {},
  login: (formData) => {},
  getUser: (token) => {},
  logout: () => {},
});

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: localStorage.getItem('token') !== null ? true : false,
  user: null,
};

const reducerFn = (state, action) => {
  switch (action.type) {
    case REGISTER_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuth: true,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        token: state.token,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isAuth: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const register = async (formData) => {
    // axios.defaults.headers.post['Content-Type'] = 'application/json';

    const { data } = await axios.post('/api/users', formData, config);
    dispatch({ type: REGISTER_USER, payload: data });
    getUser(data.token);
  };

  const login = async (formData) => {
    const { data } = await axios.post('/api/auth', formData, config);
    dispatch({ type: LOGIN_USER, payload: data });
    getUser(data.token);
  };

  const logout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  const getUser = useCallback(async (token) => {
    axios.defaults.headers.common['x-auth-token'] = token;
    const { data } = await axios.get('/api/auth');
    dispatch({ type: GET_USER, payload: data });
  }, []);

  const ctx = {
    token: state.token,
    isAuth: state.isAuth,
    user: state.user,
    register,
    login,
    logout,
    getUser,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
};
