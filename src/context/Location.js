import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { isPointWithinRadius } from 'geolib';

export const LocationContext = React.createContext();

const LocationProvider = ({ children }) => {
  const [currentMarker, setCurrentMarker] = useState(null);
  const locations = [
    {
      loc: 'H&M',
      coords: { latitude: 37.554916, longitude: 126.922167 },
      model: 'FYuy5TbT3d0WRMRpHZTv',
    },
    {
      loc: 'Books',
      coords: { latitude: 37.557208, longitude: 126.924904 },
      model: 'JPn244HKWrvkiAIXqF2E',
    },
    {
      loc: 'Hot T',
      coords: { latitude: 37.556326, longitude: 126.934398 },
      model: 'OhUGo4jyLrLu2NpS7lLz',
    },
    {
      loc: 'Theran',
      coords: { latitude: 37.3653504, longitude: 127.172608 },
      model: 'PYNitFbzP6h5Lkf5Rcny',
    },
  ];
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const Geolocation = navigator.geolocation;

  if (currentLocation.latitude === 0 && currentLocation.longitude === 0) {
    Geolocation.getCurrentPosition((pos) => {
      const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      setCurrentLocation(coords);
    });
  }

  const getAddress = async () => {
    setLoading(true);
    locations.forEach((location) => {
      if (isPointWithinRadius(location.coords, currentLocation, 200)) {
        console.log(location);
        setCurrentMarker(location);
      }
    });
    fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_location_iq_API_key}&lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&format=json`
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
        currentMarker,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocationProvider;
