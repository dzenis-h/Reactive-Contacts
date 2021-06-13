import { Fragment } from 'react';
import classes from './App.module.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { ContactProvider } from './store/contacts-context';
import { AuthProvider } from './store/auth-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <ContactProvider>
          <Router>
            <Navbar />
            <div className={classes.container}></div>
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </ContactProvider>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
