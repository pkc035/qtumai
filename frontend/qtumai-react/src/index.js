import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);
