import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { NavBar, Footer, Search } from './components';
import theme from './theme';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NavBar />
        <Search />
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}
