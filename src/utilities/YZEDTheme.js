import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    white: '#FFFDF9',
    black: '#272727',
    grey: '#7c7c7c',
  },
  fonts: ['sans-serif', 'Roboto'],
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
