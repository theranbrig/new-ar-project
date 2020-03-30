import React, { useState } from 'react';

import PropTypes from 'prop-types';

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openBag, setOpenBag] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openPhotoUpload, setOpenPhotoUpload] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openShareLinks, setOpenShareLinks] = useState('');
  const [openFullScreenSlider, setOpenFullScreenSlider] = useState('');
  const [sliderPhotos, setSliderPhotos] = useState([]);

  const closeSearchAndClear = callback => {
    setBodyScroll(false);
    setOpenSearch(false);
    callback();
  };

  const closePhotoUploadAndClear = callback => {
    setBodyScroll(false);
    setOpenPhotoUpload(false);
    callback();
  };

  const setBodyScroll = state => {
    if (!state) {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'relative';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <ModalContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        openBag,
        setOpenBag,
        openSearch,
        setOpenSearch,
        openPhotoUpload,
        setOpenPhotoUpload,
        closeSearchAndClear,
        closePhotoUploadAndClear,
        openShareLinks,
        setOpenShareLinks,
        setBodyScroll,
        openOptions,
        setOpenOptions,
        openFullScreenSlider,
        setOpenFullScreenSlider,
        sliderPhotos,
        setSliderPhotos,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
