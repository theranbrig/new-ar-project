import React, { setState, useContext } from 'react';

import { LocationContext } from '../context/Location';
import styled from 'styled-components';

export const TestStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: 90vh;
  padding-top: 10vh;
`;

export const Location = () => {
  const { currentLocation, address } = useContext(LocationContext);

  return (
    <TestStyles>
      <h1>Location</h1>
      <p>
        You are located at "{currentLocation.latitude}", "{currentLocation.longitude}"
      </p>
      <p>Your address is {address}</p>
    </TestStyles>
  );
};
export default Location;
