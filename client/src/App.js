import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer, Content } from './components/layout';
import theme from './theme';

const useStyles = makeStyles({
  background: {
    backgroundImage: 'url("/bg-content.png")',
    margin: '0',
    padding: '0'
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container className={classes.background} maxWidth={false}>
          <Content />
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}
