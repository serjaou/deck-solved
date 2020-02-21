import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Search } from '../../components';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '90vh',
    padding: '0'
  }
}));

function Content() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='lg'>
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
  );
}

export default Content;
