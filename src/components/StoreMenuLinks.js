import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StoreMenuStyles = styled.div`
  button {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 0px 2rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${props => props.theme.colors.black};
    text-decoration: none;
    transition: color 0.3s linear;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: transparent;
    border: none;
    width: 100%;
    transition: color 0.3s linear;
    &:hover {
      color: ${props => props.theme.colors.black};
    }
    @media (max-width: 576px) {
      font-size: 2rem;
      text-align: center;
    }
    i {
      font-size: 1rem;
      color: ${props => props.theme.colors.black};
      align-self: center;
      -webkit-text-stroke-width: 0px;
    }
  }
  a.store-subcategory {
    font-size: 1.2rem;
    text-transform: capitalize;
    color: ${props => props.theme.colors.black};
    -webkit-text-stroke-width: 0px;
    font-weight: 300;
    padding: 10px 2rem;
    letter-spacing: 0rem;
  }
  a.sub-active-link {
    font-weight: 600;
  }
`;

const StoreMenuLinks = ({ title, categories, setModals }) => {
  const [expand, setExpand] = useState(false);
  return (
    <StoreMenuStyles>
      <button onClick={() => setExpand(!expand)}>
        <p>{title}</p>{' '}
        {!expand ? <i className='fa fa-chevron-down'></i> : <i className='fa fa-chevron-up'></i>}
      </button>
      {expand && (
        <div className='sub-links'>
          {categories.map(category => (
            <NavLink
              onClick={() => setModals()}
              activeClassName='sub-active-link'
              to={`/shop/${title}-${category}`}
              className='store-subcategory'>
              {category}
            </NavLink>
          ))}
        </div>
      )}
    </StoreMenuStyles>
  );
};

export default StoreMenuLinks;
