import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationDrawer from './NavigationDrawer';
import Home from '../pages/Home';
import Subscribe from '../pages/Subscribe';
import Success from '../pages/Success';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function App() {
  return (
    <Router>
      <div style={{ width: '100%' }}>
        <NavigationDrawer />
        <Switch>
          <Route path='/subscribe'>
            <Subscribe />
          </Route>
          <Route path='/success'>
            <Success />
          </Route>
          <Route path='/product/:id'>
            <Product />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
