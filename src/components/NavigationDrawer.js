import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import MenuLinks from './MenuLinks';
import ShoppingBagModal from './ShoppingBagModal';
import { CartContext } from '../context/Cart';
import SearchModal from './SearchModal';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import ShopBagSVG from '../assets/icons/icon_shoppingbag';
import SearchSVG from '../assets/icons/icon_search';
import FullShopBagSVG from '../assets/icons/icon_shoppingbag_full';
import UserSVG from '../assets/icons/icon_user';
import LogoSVG from '../assets/icons/yzed_logo';

const StyledBurger = styled.button`
  position: fixed;
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
    height: 2px;
    background: ${props => props.theme.colors.black};
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
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
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
  box-shadow: 0px 0px 6px #c7c7c7;
  .right-icons {
    min-width: 95px;
    svg {
      height: 2.2rem;
      @media (max-width: 480px) {
        display: ${({ open }) => (open ? 'none' : '')};
      }
    }
    a {
      margin-right: 10px;
      min-height: 40px;
      @media (max-width: 480px) {
        margin-right: -20px;
      }
    }
    button {
      width: 30px;
      background: none;
      border: none;
      position: relative;
      height: 2.5rem;
      @media (max-width: 480px) {
        font-size: 1.6rem;
        margin: 0px 10px 0;
      }
    }
    #cart-button {
      margin-right: 30px;
      @media (max-width: 480px) {
        margin-right: 0;
      }
    }
  }
  .left-icons {
    min-width: 95px;
    button {
      background: none;
      border: none;
      height: 2.5rem;
      width: 2.5rem;
      margin-left: 4.2rem;
      padding: 0;
      @media (max-width: 480px) {
        width: 2.5rem;
        margin-left: 60px;
      }
      svg {
        height: 2.2rem;
        @media (max-width: 480px) {
          display: ${({ open }) => (open ? 'none' : 'block')};
        }
      }
      @media (max-width: 480px) {
        width: ${({ open }) => (open ? '110' : '')};
      }
    }
  }
  .logo-link svg {
    height: 4vh;
    @media (max-width: 480px) {
      height: 2.5vh;
    }
  }
`;

const NavigationDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openBag, setOpenBag] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { cart, cartLoading } = useContext(CartContext);
  const { userData } = useContext(FirebaseContext);

  const node = React.useRef();

  return (
    <>
      <StretchedNavStyles className='main-stretched-nav' open={open}>
        <div className='left-icons'>
          <button
            onClick={() => {
              setOpen(false);
              setOpenBag(false);
              setOpenSearch(!openSearch);
            }}
            aria-label='Open Search'>
            <SearchSVG />
          </button>
        </div>
        <Link to='/' className='logo-link'>
          <LogoSVG />
        </Link>
        <div className='right-icons'>
          <Link to={userData ? '/profile' : '/login'}>
            <UserSVG />
          </Link>
          <button
            onClick={() => {
              setOpenBag(!openBag);
              setOpen(false);
              setOpenSearch(false);
            }}
            aria-label='Toggle Cart'
            id='cart-button'>
            {cart.length ? <FullShopBagSVG /> : <ShopBagSVG />}
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
