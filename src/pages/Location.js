import React, { setState, useContext } from 'react';

import { LocationContext } from '../context/Location';

export const Location = () => {
  const { currentLocation, address } = useContext(LocationContext);

  return (
    <div>
      <h1>Location</h1>
      <p>
        You are located at "{currentLocation.lat}", "{currentLocation.long}"
      </p>
      <p>Your address is {address}</p>
    </div>
  );
};
export default Location;
