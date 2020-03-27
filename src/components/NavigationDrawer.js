import React, { useContext } from 'react';

import AddPhotoSVG from '../assets/icons/icon_add_photo';
import { CartContext } from '../context/Cart';
import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import FullShopBagSVG from '../assets/icons/icon_shoppingbag_full';
import { Link } from 'react-tiger-transition';
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
  top: calc(5vh - 1rem);
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
    top: calc(5vh - 1rem);
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

const Burger = () => {
  const {
    openMenu,
    setOpenMenu,
    setOpenSearch,
    setOpenBag,
    setOpenPhotoUpload,
    setBodyScroll,
  } = useContext(ModalContext);

  return (
    <StyledBurger
      open={openMenu}
      onClick={() => {
        setOpenMenu(!openMenu);
        setOpenBag(false);
        setOpenSearch(false);
        setOpenPhotoUpload(false);
        if (window.innerWidth < 576) {
          setBodyScroll(!openMenu);
        }
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
        height: 2rem;
        vertical-align: middle;
      }
    }
  }
  .right-icons {
    width: 100px;
    text-align: right;
    button {
      height: 50px;
      width: 50px;
      svg {
        height: 2rem;
        vertical-align: middle;
      }
    }
  }
  .logo-link svg {
    height: 25px;
    @media (max-width: 480px) {
      height: 20px;
    }
    @media (min-width: 500px) {
      height: 40px;
    }
  }
`;

const NavigationDrawer = ({ children }) => {
  const {
    openMenu,
    setOpenMenu,
    openSearch,
    setOpenSearch,
    openBag,
    setOpenBag,
    openPhotoUpload,
    setOpenPhotoUpload,
    setBodyScroll,
  } = useContext(ModalContext);

  const { userData } = useContext(FirebaseContext);

  const { cart } = useContext(CartContext);

  const node = React.useRef();

  return (
    <>
      <StretchedNavStyles className='main-stretched-nav' open={openMenu}>
        <div className='left-icons'>
          <button
            onClick={() => {
              setOpenMenu(false);
              setOpenBag(false);
              setOpenSearch(!openSearch);
              setOpenPhotoUpload(false);
              setBodyScroll(!openSearch);
            }}
            aria-label='Open Search'>
            {openSearch ? <CloseSVG /> : <SearchSVG />}
          </button>
        </div>
        <Link to='/' transition='glide-right' className='logo-link'>
          <LogoSVG />
        </Link>
        <div className='right-icons'>
          {userData.loggedIn && (
            <button
              aria-label='Open Upload Photo'
              onClick={() => {
                setOpenPhotoUpload(!openPhotoUpload);
                setBodyScroll(!openPhotoUpload);
                setOpenSearch(false);
                setOpenMenu(false);
                setOpenBag(false);
              }}>
              <AddPhotoSVG />
            </button>
          )}
          {/* <button
            onClick={() => {
              setOpenBag(!openBag);
              setOpenMenu(false);
              setOpenSearch(false);
              setOpenPhotoUpload(false);
              setBodyScroll(!openBag);
            }}
            aria-label='Toggle Cart'
            id='cart-button'>
            {cart.length ? <FullShopBagSVG /> : <ShopBagSVG />}
          </button> */}
        </div>
      </StretchedNavStyles>
      <ShoppingBagModal />
      <UploadPhoto />
      <SearchModal />
      <div>{children}</div>
      <div ref={node}>
        <Burger />
        <MenuLinks />
      </div>
    </>
  );
};

export default NavigationDrawer;
