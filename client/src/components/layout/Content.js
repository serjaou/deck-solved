import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Search, SearchResults } from '../../components';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '90vh'
  }
}));

function Content() {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const searchName = query.get('name');

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/search' />
        </Route>
        <Route path='/search'>
          {searchName ? <SearchResults name={searchName} /> : <Search />}
        </Route>
        <Route path='/build-deck'>BUILD DECK</Route>
        <Route path='/about'>ABOUT</Route>
      </Switch>
    </Container>
  );
}

export default Content;
