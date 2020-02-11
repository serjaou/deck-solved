import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '14rem auto 20rem',
    textAlign: 'center'
  },
  input: {
    width: '32rem',
    marginRight: '2rem'
  }
}));

function Search() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='md'>
      <Input
        className={classes.input}
        autoFocus={true}
        margin='dense'
        placeholder='Search for a card...'
        type='search'
      />
      <Button variant='contained' color='secondary'>
        Search
      </Button>
    </Container>
  );
}

export default Search;
