import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, InputBase, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    padding: '0.5rem 1rem',
    margin: '0.25rem'
  },
  container: {
    paddingTop: '35vh',
    textAlign: 'center'
  },
  input: {
    width: '100%'
  },
  paper: {
    display: 'inline-block',
    margin: '0.25rem',
    padding: '0.25rem 1rem',
    width: '75%'
  }
}));

function Search() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='md'>
      <Paper className={classes.paper} elevation={2}>
        <InputBase
          autoFocus={true}
          className={classes.input}
          placeholder='Search for a card...'
          type='search'
        />
      </Paper>
      <Button className={classes.button} variant='contained' color='secondary'>
        Search
      </Button>
    </Container>
  );
}

export default Search;
