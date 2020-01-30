import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationDrawer from './NavigationDrawer';
import Home from '../pages/Home';
import Subscribe from '../pages/Subscribe';
import Success from '../pages/SubscribeSuccess';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import Profile from '../pages/Profile';
import Shop from '../pages/Shop';
import MainSearchPage from '../pages/Search';
import ShopCategory from '../pages/ShopCategory';

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
          <Route path='/order_success'>
            <OrderSuccess />
          </Route>
          <Route path='/product/:id'>
            <Product />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Route exact path='/shop'>
            <Shop />
          </Route>
          <Route exact path='/shop/:category'>
            <ShopCategory />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/search/:query'>
            <MainSearchPage />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
