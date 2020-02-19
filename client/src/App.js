import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { NavBar, Footer, Search } from './components';
import theme from './theme';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: 'url("/bg-content.png")',
    margin: '0',
    padding: '0'
  },
  content: {
    minHeight: '90vh'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Container className={classes.background} maxWidth={false}>
          <Container className={classes.content} maxWidth='lg'>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/search' />
              </Route>
              <Route path='/search'>
                <Search />
              </Route>
              <Route path='/build-deck'>BUILD DECK</Route>
              <Route path='/about'>ABOUT</Route>
            </Switch>
          </Container>
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}
