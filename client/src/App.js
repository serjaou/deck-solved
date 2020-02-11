import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Search from './components/Search';
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
