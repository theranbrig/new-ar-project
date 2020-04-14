import React, { useState } from 'react';

import PropTypes from 'prop-types';

export const LocationContext = React.createContext();

const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lon: 0 });

  const Geolocation = navigator.geolocation;
  const location = Geolocation.getCurrentPosition((pos) =>
    setCurrentLocation({ lat: pos.coords.latitude, long: pos.coords.longitude })
  );

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocationProvider;
