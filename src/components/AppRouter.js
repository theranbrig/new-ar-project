import 'react-tiger-transition/styles/main.min.css';

import { Link, Navigation, Redirect, Route, Screen, glide } from 'react-tiger-transition';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Admin from '../pages/Admin';
import Brand from '../pages/Brand';
import Checkout from '../pages/Checkout';
import Comments from '../pages/Comments';
import CreateProduct from '../pages/CreateProduct';
import EditProduct from '../pages/EditProduct';
import FeaturedProducts from '../pages/FeaturedProducts';
import Feed from '../pages/Feed';
import Home from '../pages/Home';
import { LastLocationProvider } from 'react-router-last-location';
import Login from '../pages/Login';
import MainSearchPage from '../pages/Search';
import NavigationDrawer from './NavigationDrawer';
import OrderSuccess from '../pages/OrderSuccess';
import Product from '../pages/Product';
import Profile from '../pages/Profile';
import React from 'react';
import Register from '../pages/Register';
import RequestReset from '../pages/ResetRequest';
import Sale from '../pages/Sale';
import Shop from '../pages/Shop';
import ShopCategory from '../pages/ShopCategory';
import Subscribe from '../pages/Subscribe';
import Success from '../pages/SubscribeSuccess';
import Threads from '../pages/Threads';
import User from '../pages/User';

glide({
  name: 'glide-left',
});
glide({
  name: 'glide-right',
  direction: 'right',
});

const screenStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

document.getElementById('root').style.height = '100vh';

export default function App() {
  return (
    <Router onUpdate={() => window.scrollTo(-50, 0)}>
      <LastLocationProvider>
        <div style={{ width: '100%', backgroundColor: '#fffdf9', height: '100vh' }}>
          <Navigation defaultRoute={<Redirect to='/' />}>
            <NavigationDrawer />
            <Route screen path='/subscribe'>
              <Subscribe />
            </Route>
            <Route screen path='/success'>
              <Success />
            </Route>
            {/* <Route path='/order_success'>
            <OrderSuccess />
          </Route> */}
            <Route screen path='/item/:id'>
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
            <Route screen path='/feed'>
              <Feed />
            </Route>
            <Route screen path='/threads/:userId'>
              <Threads />
            </Route>
            <Route screen path='/login'>
              <Login />
            </Route>
            <Route screen path='/register'>
              <Register />
            </Route>
            <Route screen path='/search/:query'>
              <MainSearchPage />
            </Route>
            <Route screen path='/profile'>
              <Profile />
            </Route>
            <Route screen path='/create'>
              <CreateProduct />
            </Route>
            <Route screen exact path='/edit/:product'>
              <EditProduct />
            </Route>
            <Route screen path='/admin'>
              <Admin />
            </Route>
            <Route screen exact path='/user/:id'>
              <User />
            </Route>
            <Route screen exact path='/comments/:photoId'>
              <Comments />
            </Route>
            <Route screen path='/featured'>
              <FeaturedProducts />
            </Route>
            <Route screen path='/request_reset'>
              <RequestReset />
            </Route>
            <Route screen exact path='/'>
              <Home />
            </Route>
          </Navigation>
        </div>
      </LastLocationProvider>
    </Router>
  );
}
