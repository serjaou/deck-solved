import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { NavBar, Footer, Search } from './components';
import theme from './theme';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '0',
    padding: '2rem 2rem 0.5rem',
    backgroundImage: 'url("/bg-content.png")'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container className={classes.container} maxWidth={false}>
        <Search />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
