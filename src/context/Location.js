import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

export const LocationContext = React.createContext();

const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, long: 0 });
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const Geolocation = navigator.geolocation;
  if (currentLocation.lat === 0 && currentLocation.long === 0) {
    Geolocation.getCurrentPosition((pos) => {
      const coords = { lat: pos.coords.latitude, long: pos.coords.longitude };
      setCurrentLocation(coords);
    });
  }

  const getAddress = async () => {
    setLoading(true);

    fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_location_iq_API_key}&lat=${currentLocation.lat}&lon=${currentLocation.long}&format=json`
    )
      .then((res) => {
        res
          .json()
          .then((json) => {
            setAddress(json.display_name);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAddress();
  }, [currentLocation]);

  return (
    <LocationContext.Provider
      value={{
        address,
        currentLocation,
        locationLoading: loading,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocationProvider;
