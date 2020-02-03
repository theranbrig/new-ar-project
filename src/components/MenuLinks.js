import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FBLogo from '../assets/icons/facebook-5-64.png';
import InstaLogo from '../assets/icons/instagram-5-64.png';
import { FirebaseContext } from '../context/Firebase';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #000;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: ${({ open }) => (open ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  z-index: 520;
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
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
    text-decoration: none;
    transition: color 0.3s linear;
    font-family: Montserrat, sans-serif;
    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: #fff;
    }
    span {
      font-size: 0.8rem;
      color: white;
      font-weight: 300;
      -webkit-text-stroke-width: 0px;
    }
  }
  a.active-link {
    color: #fff;
  }
  .social-icons {
    padding: 2rem 0;
    @media (max-width: 576px) {
      margin: 0 auto;
    }
  }
  .social-icons a {
    display: inline;
    padding: 5px;
    img {
      height: 35px;
    }
  }
`;

const MenuLinks = ({ open, setOpen }) => {
  const { userData } = useContext(FirebaseContext);

  return (
    <StyledMenu open={open}>
      <NavLink to='/' onClick={() => setOpen(false)} exact activeClassName='active-link'>
        Home
      </NavLink>
      <NavLink to='/shop' onClick={() => setOpen(false)} activeClassName='active-link'>
        Shop
      </NavLink>
      <NavLink to='/checkout' onClick={() => setOpen(false)} activeClassName='active-link'>
        My Bag
      </NavLink>
      {/* <NavLink to='/search' onClick={() => setOpen(false)} activeClassName='active-link'>
        Search
      </NavLink> */}
      <NavLink to='/subscribe' onClick={() => setOpen(false)} activeClassName='active-link'>
        Subscribe
      </NavLink>
      {!userData ? (
        <NavLink to='/login' onClick={() => setOpen(false)} activeClassName='active-link'>
          Login
        </NavLink>
      ) : (
        <NavLink to='/profile' onClick={() => setOpen(false)} activeClassName='active-link'>
          Profile
          <br />
          <span>{userData.userName}</span>
        </NavLink>
      )}
      <div className='social-icons'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => setOpen(false)}>
          <img src={FBLogo} alt='facebook' />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => setOpen(false)}>
          <img src={InstaLogo} alt='instagram' />
        </a>
      </div>
    </StyledMenu>
  );
};

export default MenuLinks;
