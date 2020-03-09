import React, { useContext, useState } from 'react';

import AddPhotoSVG from '../assets/icons/icon_add_photo';
import { CartContext } from '../context/Cart';
import { FirebaseContext } from '../context/Firebase';
import FullShopBagSVG from '../assets/icons/icon_shoppingbag_full';
import { Link } from 'react-router-dom';
import LogoSVG from '../assets/icons/yzed_logo';
import MenuLinks from './MenuLinks';
import { ModalContext } from '../context/Modal';
import SearchModal from './SearchModal';
import SearchSVG from '../assets/icons/icon_search';
import ShopBagSVG from '../assets/icons/icon_shoppingbag';
import ShoppingBagModal from './ShoppingBagModal';
import UploadPhoto from '../components/UploadPhotoModal';
import styled from 'styled-components';

const StyledBurger = styled.button`
  position: fixed;
  top: 3vh;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
  &:focus {
    outline: none;
  }
  @media (max-width: 576px) {
    top: 20px;
    left: 15px;
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

const Burger = ({
  open,
  setOpen,
  setOpenBag,
  setOpenSearch,
  setPhotoUploadOpen,
  setBodyScroll,
}) => {
  return (
    <StyledBurger
      open={open}
      onClick={() => {
        setOpen(!open);
        setOpenBag(false);
        setOpenSearch(false);
        setPhotoUploadOpen(false);
        setBodyScroll(!open);
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
  z-index: 1001;
  box-shadow: 0px 0px 6px #c7c7c7;
  button {
    border: none;
    background: transparent;
  }
  .left-icons {
    width: 100px;
    button {
      margin-left: 50px;
      height: 50px;
      width: 50px;
      svg {
        height: 35px;
      }
    }
  }
  .right-icons {
    width: 100px;
    button {
      height: 50px;
      width: 50px;
      svg {
        height: 35px;
      }
    }
  }
  .logo-link svg {
    height: 25px;
    @media (max-width: 480px) {
      display: ${({ open }) => (open ? 'none' : '')};
      height: 20px;
    }
    @media (min-width: 500px) {
      height: 40px;
    }
  }
`;

const NavigationDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openBag, setOpenBag] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);

  const { userData } = useContext(FirebaseContext);

  const { cart } = useContext(CartContext);

  const { setPhotoUploadOpen, photoUploadOpen } = useContext(ModalContext);

  const node = React.useRef();

  const setBodyScroll = state => {
    if (!state) {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'relative';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    }
  };

  return (
    <>
      <StretchedNavStyles className='main-stretched-nav' open={open}>
        <div className='left-icons'>
          <button
            onClick={() => {
              setOpen(false);
              setOpenBag(false);
              setOpenSearch(!openSearch);
              setPhotoUploadOpen(false);
              setBodyScroll(!openSearch);
            }}
            aria-label='Open Search'>
            <SearchSVG />
          </button>
        </div>
        <Link to='/' className='logo-link'>
          <LogoSVG />
        </Link>
        <div className='right-icons'>
          {userData.loggedIn && (
            <button
              aria-label='Open Upload Photo'
              onClick={() => {
                setPhotoUploadOpen(!photoUploadOpen);
                setBodyScroll(!photoUploadOpen);
              }}>
              <AddPhotoSVG />
            </button>
          )}
          <button
            onClick={() => {
              setOpenBag(!openBag);
              setOpen(false);
              setOpenSearch(false);
              setPhotoUploadOpen(false);
              setBodyScroll(!openBag);
            }}
            aria-label='Toggle Cart'
            id='cart-button'>
            {cart.length ? <FullShopBagSVG /> : <ShopBagSVG />}
          </button>
        </div>
      </StretchedNavStyles>
      <ShoppingBagModal
        openBag={openBag}
        setOpenSearch={setOpenSearch}
        setOpenBag={setOpenBag}
        setPhotoUploadOpen={setPhotoUploadOpen}
        setBodyScroll={setBodyScroll}
      />
      <UploadPhoto setBodyScroll={setBodyScroll} />
      <SearchModal
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        setBodyScroll={setBodyScroll}
      />
      <div>{children}</div>
      <div ref={node}>
        <Burger
          open={open}
          setOpen={setOpen}
          setOpenBag={setOpenBag}
          setOpenSearch={setOpenSearch}
          setPhotoUploadOpen={setPhotoUploadOpen}
          setBodyScroll={setBodyScroll}
        />
        <MenuLinks open={open} setOpen={setOpen} setBodyScroll={setBodyScroll} />
      </div>
    </>
  );
};

export default NavigationDrawer;
