import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ErrorStyles = styled.div`
  background: ${props => props.theme.colors.white};
  min-height: 88vh;
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
  padding-top: 12vh;
  text-align: center;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.black};
  img {
    display: block;
    max-width: 90%;
    margin: 0 auto;
    width: 500px;
  }
  a {
    color: ${props => props.theme.colors.black};
    font-weight: 600;
  }
`;

const Error = () => {
  return (
    <ErrorStyles>
      <img
        src='https://cdn.pixabay.com/photo/2018/05/31/15/06/not-hear-3444212_1280.jpg'
        alt='See no, Speak no, Hear no, Evil'
      />
      <h1>Ooops. Something went wrong.</h1>
      <p>
        Go <Link to='/'>back home</Link> and start your journey again.
      </p>
    </ErrorStyles>
  );
};

export default Error;
