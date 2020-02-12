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
};
const YZEDTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default YZEDTheme;
