import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import yzedLogo from '../assets/images/yzed-logo.png';
import MenuLinks from './MenuLinks';
import ShoppingBagModal from './ShoppingBagModal';
import { FirebaseContext } from '../context/Firebase';
import { products } from '../data';

const StyledBurger = styled.button`
  position: absolute;
  top: 2.5vh;
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

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)} aria-label='Toggle Menu'>
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
  img {
    height: 10vh;
    @media (max-width: 576px) {
      height: 5vh;
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
    }
  }
  .hidden {
    visibility: hidden;
    width: 30px;
  }
`;

const NavigationDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openBag, setOpenBag] = useState(false);
  const [shoppingBag, setShoppingBag] = useState([]);
  const { userData, dbh } = useContext(FirebaseContext);

  const node = React.useRef();

  useEffect(() => {
    if (userData) {
      let cartItems = [];
      dbh
        .collection('cartItems')
        .where('userId', '==', userData.email)
        .onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            cartItems.push(doc.data());
          });
          console.log('Cart', cartItems);
          if (cartItems.length) {
            const cart = cartItems.reduce((accum, item) => {
              const product = products.find(product => item.productId === product.id);
              console.log(product);
              if (product) accum.push({ ...item, ...product });
              return accum;
            }, []);
            setShoppingBag(cart);
          }
        });
    }
  }, [userData]);

  return (
    <div>
      <StretchedNavStyles className='main-stretched-nav'>
        <div className='hidden'></div>
        <img src={yzedLogo} alt='yzed logo' />
        <div>
          <button
            onClick={() => {
              setOpenBag(!openBag);
            }}
            aria-label='Toggle Cart'>
            <i className='fa fa-shopping-bag' aria-hidden='true'></i>
            <i className='cart-count'>{shoppingBag.length}</i>
          </button>
        </div>
      </StretchedNavStyles>
      <ShoppingBagModal openBag={openBag} shoppingBag={shoppingBag} />
      <div>{children}</div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <MenuLinks open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default NavigationDrawer;
