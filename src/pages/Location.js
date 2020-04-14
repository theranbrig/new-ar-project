import React, { setState, useContext } from 'react';

import { LocationContext } from '../context/Location';

export const Location = () => {
  const { currentLocation } = useContext(LocationContext);
  console.log(currentLocation);
  return (
    <div>
      <h1>Location</h1>
      <p>
        You are located at "{currentLocation.lat}", "{currentLocation.long}"
      </p>
    </div>
  );
};
export default Location;
