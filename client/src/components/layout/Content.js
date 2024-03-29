import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { CardPage } from '../../components/card';
import { Search, SearchPage } from '../../components/search';
import { AboutPage, BuildDeckPage, NotFound } from '../../components/supp';
import qs from 'qs';

const useStyles = makeStyles({
  container: { minHeight: '90vh', padding: '0' }
});

function Content() {
  const classes = useStyles();
  const location = useLocation();
  const queryObj = location.search ? qs.parse(location.search.slice(1)) : null;

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/search' />
        </Route>
        <Route exact path='/search'>
          {queryObj ? <Search query={queryObj} /> : <SearchPage />}
        </Route>
        <Route exact path='/cards/:name'>
          <CardPage />
        </Route>
        <Route exact path='/build-deck'>
          <BuildDeckPage />
        </Route>
        <Route exact path='/about'>
          <AboutPage />
        </Route>
        <Route exact path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default Content;
