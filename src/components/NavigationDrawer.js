import React from 'react';
import styled from 'styled-components';
import yzedLogo from '../assets/images/yzed-logo.png';
import MenuLinks from './MenuLinks';

const StyledBurger = styled.button`
  position: absolute;
  top: 3%;
  left: 2rem;
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
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
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
  img {
    height: 10vh;
    @media (max-width: 576px) {
      height: 5vh;
    }
  }
`;

const NavigationDrawer = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  return (
    <div>
      <StretchedNavStyles className='main-stretched-nav'>
        <img src={yzedLogo} alt='yzed logo' />
      </StretchedNavStyles>
      <div>{children}</div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <MenuLinks open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default NavigationDrawer;
