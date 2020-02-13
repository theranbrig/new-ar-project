import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FBLogo from '../assets/icons/facebook-5-64.png';
import InstaLogo from '../assets/icons/instagram-5-64.png';
import { FirebaseContext } from '../context/Firebase';
import InstaSVG from '../assets/icons/icon_instagram';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: ${props => props.theme.colors.white};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  position: ${({ open }) => (open ? 'fixed' : 'absolute')};
  top: 10vh;
  left: 0;
  z-index: 520;
  transition: transform 0.3s ease-in-out;
  font-family: ${props => props.theme.fonts.main};
  @media (max-width: 576px) {
    width: 100%;
    padding: 0;
  }
  a,
  i {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${props => props.theme.colors.black};
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: 576px) {
      font-size: 2rem;
      text-align: center;
    }
    &:hover {
      color: ${props => props.theme.colors.black};
    }
    span {
      font-size: 0.8rem;
      color: ${props => props.theme.colors.black};
      font-weight: 300;
      -webkit-text-stroke-width: 0px;
    }
  }
  a.active-link {
    color: ${props => props.theme.colors.black};
  }
  .side-links {
    top: 10vh;
    position: relative;
    a {
      display: block;
    }
  }

  .top-links {
    background: ${props => props.theme.colors.black};
    position: absolute;
    width: 100%;
    height: 5rem;
    line-height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    a {
      align-self: center;
      padding: 0;
      letter-spacing: 0;
      font-size: 1.5rem;
      &:hover {
        color: ${props => props.theme.colors.grey};
      }
    }
    a.top-active-link {
      border-bottom: 3px solid ${props => props.theme.colors.white};
    }
  }
`;

const MenuLinks = ({ open, setOpen }) => {
  const { userData } = useContext(FirebaseContext);

  return (
    <StyledMenu open={open}>
      <div className='top-links'>
        <NavLink
          to='/'
          exact
          className='top-link'
          activeClassName='top-active-link'
          onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to='/shop'
          className='top-link'
          activeClassName='top-active-link'
          onClick={() => setOpen(false)}>
          Shop
        </NavLink>
      </div>
      <div className='side-links'>
        <NavLink to='/' exact activeClassName='active-link' onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to='/shop' activeClassName='active-link' onClick={() => setOpen(false)}>
          Shop
        </NavLink>
        <NavLink to='/checkout' activeClassName='active-link' onClick={() => setOpen(false)}>
          My Bag
        </NavLink>
        {!userData && (
          <NavLink to='/subscribe' activeClassName='active-link' onClick={() => setOpen(false)}>
            Subscribe
          </NavLink>
        )}
        {!userData ? (
          <NavLink to='/login' activeClassName='active-link' onClick={() => setOpen(false)}>
            Login
          </NavLink>
        ) : (
          <NavLink to='/profile' activeClassName='active-link' onClick={() => setOpen(false)}>
            Profile
            <br />
            <span>{userData.userName}</span>
          </NavLink>
        )}
      </div>
    </StyledMenu>
  );
};

export default MenuLinks;
