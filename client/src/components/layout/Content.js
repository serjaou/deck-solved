import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CardPage } from '../../components/cards';
import { SearchRouter } from '../../components/search';
import { NotFound } from '../../components/layout/misc';

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    padding: '0'
  }
});

function Content() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/search' />
        </Route>
        <Route exact path='/search'>
          <SearchRouter />
        </Route>
        <Route exact path='/cards/:name'>
          <CardPage />
        </Route>
        <Route exact path='/build-deck'>
          __BUILD_DECK
        </Route>
        <Route exact path='/about'>
          __ABOUT
        </Route>
        <Route exact path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default Content;
