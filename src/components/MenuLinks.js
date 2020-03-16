import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { ModalContext } from '../context/Modal';
import { NavLink } from 'react-router-dom';
import StoreMenuLinks from './StoreMenuLinks';
import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: ${props => props.theme.colors.white};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  min-width: ${({ open }) => (open ? '350px' : '0')};
  height: 100vh;
  text-align: left;
  position: ${({ open }) => (open ? 'fixed' : 'fixed')};
  top: 0;
  left: 0;
  z-index: 1001;
  transition: transform 0.3s ease-in-out;
  font-family: ${props => props.theme.fonts.main};
  overflow-y: scroll;
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
    /* -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: ${props => props.theme.colors.black};
    -webkit-text-stroke: 1px ${props => props.theme.colors.black}; */
    text-shadow:
    -1px -1px 0 ${props => props.theme.colors.black},
     0   -1px 0 ${props => props.theme.colors.black},
     1px -1px 0 ${props => props.theme.colors.black},
     1px  0   0 ${props => props.theme.colors.black},
     1px  1px 0 ${props => props.theme.colors.black},
     0    1px 0 ${props => props.theme.colors.black},
    -1px  1px 0 ${props => props.theme.colors.black},
    -1px  0   0 ${props => props.theme.colors.black};
    text-decoration: none;
    transition: color 0.3s linear;
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.fonts.main};
    &:hover {
      color: ${props => props.theme.colors.black};
    }
    span {
      font-size: 0.8rem;
      color: ${props => props.theme.colors.black};
      font-weight: 300;
      text-shadow: none;
      -webkit-text-stroke-width: 0px;
    }
  }
  a.active-link {
    color: ${props => props.theme.colors.black};
  }
  .side-links {
    top: 20vh;
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
    margin-top: 10vh;
    button {
      align-self: center;
      padding: 0 0 5px 0;
      letter-spacing: 0;
      font-size: 1.5rem;
      background: none;
      border: none;
      font-weight: 600;
      font-family: ${props => props.theme.fonts.main};
      color: ${props => props.theme.colors.white};
      &:hover {
        color: ${props => props.theme.colors.grey};
      }
    }
    button.top-link-active {
      border-bottom: 2px solid ${props => props.theme.colors.white} !important;
    }
  }
`;

const MenuLinks = () => {
  const [showHome, setShowHome] = useState(true);
  const { userData } = useContext(FirebaseContext);

  const { openMenu, setOpenMenu, setBodyScroll } = useContext(ModalContext);

  const setModals = () => {
    setOpenMenu(false);
    setBodyScroll(false);
  };

  return (
    <StyledMenu open={openMenu}>
      <div className='top-links'>
        <button
          className={showHome ? 'top-link-active' : 'top-link'}
          onClick={() => setShowHome(true)}>
          YZED
        </button>
        {/* <button
          className={!showHome ? 'top-link-active' : 'top-link'}
          onClick={() => setShowHome(false)}>
          SHOP
        </button> */}
      </div>
      <div className='side-links'>
        {showHome ? (
          <>
            <NavLink
              to='/'
              exact
              activeClassName='active-link'
              onClick={() => {
                setModals();
              }}>
              Home
            </NavLink>
            <NavLink
              to='/featured'
              activeClassName='active-link'
              onClick={() => {
                setModals();
              }}>
              Featured
            </NavLink>
            {/* <NavLink
              to='/checkout'
              activeClassName='active-link'
              onClick={() => {
                setModals();
              }}>
              My Bag
            </NavLink> */}
            {!userData && (
              <NavLink
                to='/subscribe'
                activeClassName='active-link'
                onClick={() => {
                  setModals();
                }}>
                Subscribe
              </NavLink>
            )}
            {!userData.loggedIn ? (
              <NavLink
                to='/login'
                activeClassName='active-link'
                onClick={() => {
                  setModals();
                }}>
                Login
              </NavLink>
            ) : (
              <NavLink
                to='/profile'
                activeClassName='active-link'
                onClick={() => {
                  setModals();
                }}>
                Profile
                <br />
                <span>{userData.userName}</span>
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink
              to='/shop/new'
              activeClassName='active-link'
              onClick={() => {
                setModals();
              }}>
              NEW IN
            </NavLink>
            <StoreMenuLinks
              title='women'
              setModals={setModals}
              categories={[
                'jackets',
                'dresses',
                'tops',
                'knitwear',
                'trousers',
                'jeans',
                'skirts',
                'shoes',
                'bags',
              ]}
            />
            <StoreMenuLinks
              setModals={setModals}
              title='men'
              categories={[
                'jackets',
                'shirts',
                'tops',
                'knitwear',
                'trousers',
                'jeans',
                'shoes',
                'bags',
              ]}
            />
            <StoreMenuLinks
              setModals={setModals}
              title='unisex'
              categories={['jackets', 'tops', 'knitwear', 'shoes', 'bags']}
            />
            <NavLink
              to='/shop/sale'
              activeClassName='active-link'
              onClick={() => {
                setModals();
              }}>
              SALE
            </NavLink>
          </>
        )}
      </div>
    </StyledMenu>
  );
};

export default MenuLinks;
