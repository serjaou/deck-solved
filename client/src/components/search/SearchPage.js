import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, InputBase, Paper } from '@material-ui/core';
import useSubmitSearch from './useSubmitSearch';

const useStyles = makeStyles({
  searchButton: {
    padding: '0.5rem 1.5rem',
    margin: '0.25rem'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30vh 1rem 0',
    justifyContent: 'center'
  },
  paper: {
    flexGrow: '1',
    margin: '0.25rem',
    padding: '0.25rem 1rem'
  }
});

function SearchPage() {
  const classes = useStyles();
  const [value, setValue, handleSubmit] = useSubmitSearch();

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Container className={classes.container} maxWidth='md'>
      <Paper className={classes.paper} elevation={2}>
        <InputBase
          autoFocus={true}
          fullWidth={true}
          placeholder='Search for a card...'
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </Paper>
      <Button
        className={classes.searchButton}
        variant='contained'
        color='secondary'
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Container>
  );
}

export default SearchPage;
