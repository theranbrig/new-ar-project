import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [photoUploadOpen, setPhotoUploadOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        photoUploadOpen,
        setPhotoUploadOpen,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
