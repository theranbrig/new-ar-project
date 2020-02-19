import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    white: '#FFFDF9',
    black: '#272727',
    grey: '#7c7c7c',
    lightGrey: '#eaeaea',
  },
  fonts: { main: "'Work Sans', sans-serif;" },
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
  boxShadows: {
    topAndBottom: '0 -6px 6px -6px #b9b9b9, 0 6px 6px -6px #b9b9b9;',
    bottom: '0 6px 6px -6px #b9b9b9;',
    top: '0 -6px 6px -6px #b9b9b9;',
    allAround: '0 0 6px #b9b9b9;',
  },
};
const YZEDTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default YZEDTheme;
