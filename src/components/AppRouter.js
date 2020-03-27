import { BrowserRouterasRouter, Route, Switch, useLocation } from 'react-router-dom';
import React, { useContext } from 'react';

import Admin from '../pages/Admin';
import { AnimatePresence } from 'framer-motion';
import Brand from '../pages/Brand';
import Checkout from '../pages/Checkout';
import Comments from '../pages/Comments';
import CreateProduct from '../pages/CreateProduct';
import EditProduct from '../pages/EditProduct';
import FeaturedProducts from '../pages/FeaturedProducts';
import Feed from '../pages/Feed';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MainSearchPage from '../pages/Search';
import { ModalContext } from '../context/Modal';
import NavigationDrawer from './NavigationDrawer';
import OrderSuccess from '../pages/OrderSuccess';
import Product from '../pages/Product';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import RequestReset from '../pages/ResetRequest';
import Sale from '../pages/Sale';
import Share from './Share';
import Shop from '../pages/Shop';
import ShopCategory from '../pages/ShopCategory';
import Subscribe from '../pages/Subscribe';
import Success from '../pages/SubscribeSuccess';
import Threads from '../pages/Threads';
import User from '../pages/User';

export default function App() {
  const location = useLocation();
  const { openShareLinks } = useContext(ModalContext);

  return (
    <div style={{ width: '100%', backgroundColor: '#fffdf9' }}>
      <NavigationDrawer />
      {openShareLinks && <Share product={openShareLinks} />}
      <AnimatePresence>
        <Switch>
          <Route path='/subscribe'>
            <Subscribe />
          </Route>
          <Route path='/success'>
            <Success />
          </Route>
          {/* <Route path='/order_success'>
            <OrderSuccess />
          </Route> */}
          <Route path='/item/:id'>
            <Product />
          </Route>
          {/* <Route path='/checkout'>
            <Checkout />
          </Route> */}
          {/* <Route exact path='/shop'>
            <Shop />
          </Route> */}
          {/* <Route exact path='/brand/:name'>
            <Brand />
          </Route> */}
          {/* <Route exact path='/shop/:category'>
            <ShopCategory />
          </Route> */}
          {/* <Route exact path='/sale/:value'>
            <Sale />
          </Route> */}
          <Route path='/feed'>
            <Feed />
          </Route>
          <Route path='/threads/:userId'>
            <Threads />
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
          <Route path='/create'>
            <CreateProduct />
          </Route>
          <Route exact path='/edit/:product'>
            <EditProduct />
          </Route>
          <Route path='/admin'>
            <Admin />
          </Route>
          <Route exact path='/user/:id'>
            <User />
          </Route>
          <Route exact path='/comments/:photoId'>
            <Comments />
          </Route>
          <Route path='/featured'>
            <FeaturedProducts />
          </Route>
          <Route path='/request_reset'>
            <RequestReset />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}
