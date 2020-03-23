import React, { useContext, useEffect, useState } from 'react';

import BackButton from './BackButton';
import styled from 'styled-components';

export const TopStyles = styled.div`
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  button,
  div {
    align-self: center;
    width: 40px;
  }
  h1 {
    font-family: ${props => props.theme.fonts.main};
    color: ${props => props.theme.colors.black};
    font-size: 1.4rem;
  }
`;

const TopTitle = ({ title, children }) => {
  return (
    <TopStyles>
      <BackButton />
      <h1>{title}</h1>
      <div>{children}</div>
    </TopStyles>
  );
};

export default TopTitle;
