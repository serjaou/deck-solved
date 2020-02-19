import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Search, SearchResults } from '../../components';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '90vh'
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
        <Route exact path='/search'>
          <Search />
        </Route>
        <Route exact path='/search/:query'>
          <SearchResults />
        </Route>
        <Route path='/build-deck'>BUILD DECK</Route>
        <Route path='/about'>ABOUT</Route>
      </Switch>
    </Container>
  );
}

export default Content;
