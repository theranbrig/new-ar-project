import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import yzedLogo from '../assets/images/yzed-logo.png';
import MenuLinks from './MenuLinks';
import ShoppingBagModal from './ShoppingBagModal';
import { CartContext } from '../context/Cart';
import SearchModal from './SearchModal';
import { FirebaseContext } from '../context/Firebase';

const StyledBurger = styled.button`
  position: absolute;
  top: 3vh;
  left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000;
  &:focus {
    outline: none;
  }
  @media (max-width: 576px) {
    top: 20px;
    left: 20px;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? '#989898' : '#fff')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = ({ open, setOpen, setOpenBag, setOpenSearch }) => {
  return (
    <StyledBurger
      open={open}
      onClick={() => {
        setOpen(!open);
        setOpenBag(false);
        setOpenSearch(false);
      }}
      aria-label='Toggle Menu'>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

const StretchedNavStyles = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 500;
  img {
    height: 10vh;
    @media (max-width: 576px) {
      height: 4vh;
    }
  }
  button {
    color: white;
    font-size: 2rem;
    width: 30px;
    margin-right: 20px;
    background: none;
    border: none;
    position: relative;
    .cart-count {
      position: absolute;
      bottom: -5px;
      left: -5px;
      font-size: 14px;
      height: 20px;
      width: 20px;
      line-height: 20px;
      border-radius: 50%;
      background: linear-gradient(to top, #2a43a3 80%, #324fb3 20%);
      padding: 5px;
      @media (max-width: 480px) {
        font-size: 0.6rem;
        padding: 3px;
      }
    }
    @media (max-width: 480px) {
      font-size: 1.6rem;
      margin: 0px 10px 0;
    }
  }
  .hidden {
    visibility: hidden;
    width: 130px;
    @media (max-width: 480px) {
      width: 60px;
    }
  }
`;

const NavigationDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [stateCart, setStateCart] = useState([]);
  const [openBag, setOpenBag] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { cart, cartLoading } = useContext(CartContext);
  const { userData, dbh } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchCartData = async () => {
      let tempCart = [];
      if (userData) {
        await dbh
          .collection('cartItems')
          .where('userId', '==', userData.id)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              tempCart.push({ id: doc.ref.id, ...doc.data() });
              console.log(tempCart);
            });
          });
        await setStateCart(tempCart);
        return tempCart;
      } else {
        tempCart = (await JSON.parse(localStorage.getItem('shoppingCart'))) || [];
        await setStateCart(tempCart);
        return tempCart;
      }
    };
    const items = fetchCartData();
  }, [cart, userData]);

  const node = React.useRef();

  return (
    <>
      <StretchedNavStyles className='main-stretched-nav'>
        <div className='hidden'></div>
        <img src={yzedLogo} alt='yzed logo' />
        <div className='right-icons'>
          <button
            onClick={() => {
              setOpen(false);
              setOpenBag(false);
              setOpenSearch(!openSearch);
            }}
            aria-label='Search'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </button>
          <button
            onClick={() => {
              setOpenBag(!openBag);
              setOpen(false);
              setOpenSearch(false);
            }}
            aria-label='Toggle Cart'>
            <i className='fa fa-shopping-bag' aria-hidden='true'></i>
            <i className='cart-count' aria-hidden='true'>
              {stateCart.length}
            </i>
          </button>
        </div>
      </StretchedNavStyles>
      <ShoppingBagModal
        openBag={openBag}
        shoppingBag={cart}
        setOpenSearch={setOpenSearch}
        cartLoading={cartLoading}
        setOpenBag={setOpenBag}
      />
      <SearchModal openSearch={openSearch} setOpenSearch={setOpenSearch} />
      <div>{children}</div>
      <div ref={node}>
        <Burger
          open={open}
          setOpen={setOpen}
          setOpenBag={setOpenBag}
          setOpenSearch={setOpenSearch}
        />
        <MenuLinks open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default NavigationDrawer;
