import { Fragment } from 'react';
import classes from './App.module.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { ContactProvider } from './store/contacts-context';

function App() {
  return (
    <Fragment>
      <ContactProvider>
        <Navbar />
        <div className={classes.container}></div>
        <Home />
      </ContactProvider>
    </Fragment>
  );
}

export default App;
