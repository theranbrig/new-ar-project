import { BrowserRouterasRouter, Route, Switch, useLocation } from 'react-router-dom';
import React, { Suspense, lazy, useContext } from 'react';

import { AnimatePresence } from 'framer-motion';
import Fade from '../components/FadeOut';
import { FirebaseContext } from '../context/Firebase';
import { FullScreenSlider } from './PhotoCarousel';
import LoadingSpinner from '../components/LoadingSpinner';
import { ModalContext } from '../context/Modal';
import NavigationDrawer from './NavigationDrawer';
import Share from './Share';

const load = (Component: any) => (props: any) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component {...props} />
  </Suspense>
);

const Admin = load(lazy(() => import('../pages/Admin')));
const Brand = load(lazy(() => import('../pages/Brand')));
const Checkout = load(lazy(() => import('../pages/Checkout')));
const Comments = load(lazy(() => import('../pages/Comments')));
const CreateProduct = load(lazy(() => import('../pages/CreateProduct')));
const EditProduct = load(lazy(() => import('../pages/EditProduct')));
const Error = load(lazy(() => import('../pages/Error')));
const FeaturedProducts = load(lazy(() => import('../pages/FeaturedProducts')));
const Feed = load(lazy(() => import('../pages/Feed')));
const Home = load(lazy(() => import('../pages/Home')));
const Login = load(lazy(() => import('../pages/Login')));
const MainSearchPage = load(lazy(() => import('../pages/Search')));
const OrderSuccess = load(lazy(() => import('../pages/OrderSuccess')));
const Product = load(lazy(() => import('../pages/Product')));
const Profile = load(lazy(() => import('../pages/Profile')));
const Register = load(lazy(() => import('../pages/Register')));
const RequestReset = load(lazy(() => import('../pages/ResetRequest')));
const Sale = load(lazy(() => import('../pages/Sale')));
const Shop = load(lazy(() => import('../pages/Shop')));
const ShopCategory = load(lazy(() => import('../pages/ShopCategory')));
const Subscribe = load(lazy(() => import('../pages/Subscribe')));
const Success = load(lazy(() => import('../pages/SubscribeSuccess')));
const Threads = load(lazy(() => import('../pages/Threads')));
const User = load(lazy(() => import('../pages/User')));

export default function App() {
  const location = useLocation();
  const {
    openShareLinks,
    sliderPhotos,
    setOpenFullScreenSlider,
    openFullScreenSlider,
  } = useContext(ModalContext);

  const { userData } = useContext(FirebaseContext);

  return (
    <>
      <NavigationDrawer />
      <div style={{ width: '100vw', backgroundColor: '#ffffff' }}>
        {openShareLinks.length > 0 && <Share product={openShareLinks} />}
        {openFullScreenSlider.length !== 0 && (
          <FullScreenSlider
            userData={userData}
            sliderPhotos={sliderPhotos}
            setOpenFullScreenSlider={setOpenFullScreenSlider}
            openFullScreenSlider={openFullScreenSlider}
          />
        )}
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
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
            <Route path='/edit/:product'>
              <EditProduct />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            <Route path='/user/:id'>
              <User />
            </Route>
            <Route path='/comments/:photoId'>
              <Comments />
            </Route>
            <Route path='/featured'>
              <FeaturedProducts />
            </Route>
            <Route path='/request_reset'>
              <RequestReset />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}
