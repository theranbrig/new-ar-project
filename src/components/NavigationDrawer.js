import React from 'react';
import styled from 'styled-components';
import yzedLogo from '../assets/images/yzed-logo.png';
import MenuLinks from './MenuLinks';
import ShoppingBagModal from './ShoppingBagModal';

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
    margin-right: 2%;
    background: none;
    border: none;
  }
  .hidden {
    visibility: hidden;
    width: 30px;
  }
`;

const NavigationDrawer = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [openBag, setOpenBag] = React.useState(false);
  const node = React.useRef();
  return (
    <div>
      <StretchedNavStyles className='main-stretched-nav'>
        <div className='hidden'></div>
        <img src={yzedLogo} alt='yzed logo' />
        <button
          onClick={() => {
            setOpenBag(!openBag);
          }}
          aria-label='Toggle Cart'>
          <i className='fa fa-shopping-cart'></i>
        </button>
      </StretchedNavStyles>
      <ShoppingBagModal openBag={openBag} />
      <div>{children}</div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <MenuLinks open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default NavigationDrawer;
