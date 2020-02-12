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
  justify-content: center;
  background: ${props => props.theme.colors.white};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: ${({ open }) => (open ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  z-index: 520;
  transition: transform 0.3s ease-in-out;
  font-family: ${props => props.theme.fonts.main};
  /* box-shadow: ${({ open }) => (open ? '-2px 2px 16px gray' : 'none')}; */
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
  .social-icons {
    padding: 2rem 0;
    @media (max-width: 576px) {
      margin: 0 auto;
    }
  }
  .social-icons a {
    display: inline;
    padding: 5px;
    color: ${props => props.theme.colors.black};
    img {
      height: 35px;
    }
  }
`;

const MenuLinks = ({ open, setOpen }) => {
  const { userData } = useContext(FirebaseContext);

  return (
    <StyledMenu open={open}>
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
      {/* <div className='social-icons'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => setOpen(false)}>
          <InstaSVG />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => setOpen(false)}>
          <img src={InstaLogo} alt='instagram' />
        </a>
      </div> */}
    </StyledMenu>
  );
};

export default MenuLinks;
