import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, InputBase, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  searchButton: {
    padding: '0.5rem 1.5rem',
    margin: '0.25rem'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30vh 0 0',
    justifyContent: 'center'
  },
  paper: {
    flexGrow: '1',
    margin: '0.25rem',
    padding: '0.25rem 1.5rem'
  }
}));

function Search() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='md'>
      <Paper className={classes.paper} elevation={2}>
        <InputBase
          autoFocus={true}
          fullWidth={true}
          placeholder='Search for a card...'
          type='search'
        />
      </Paper>
      <Button
        className={classes.searchButton}
        variant='contained'
        color='secondary'
      >
        Search
      </Button>
    </Container>
  );
}

export default Search;
