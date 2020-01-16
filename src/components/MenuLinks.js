import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FBLogo from '../assets/icons/facebook-5-64.png';
import InstaLogo from '../assets/icons/instagram-5-64.png';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #000;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 576px) {
    width: 100%;
    padding: 0;
  }
  a,
  i {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #000;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    text-decoration: none;
    transition: color 0.3s linear;
    font-family: Montserrat;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: #989898;
    }
  }
`;

const MenuLinks = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/users'>Users</Link>
      <a href='https://facebook.com'>
        <img src={FBLogo} />
      </a>
      <a href='https://instagram.com'>
        <img src={InstaLogo} />
      </a>
    </StyledMenu>
  );
};

export default MenuLinks;
