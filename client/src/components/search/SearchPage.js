import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, InputBase, Paper } from '@material-ui/core';
import { useSubmitSearch } from '../../common';

const useStyles = makeStyles({
  container: { display: 'flex', padding: '30vh 1rem 0', justifyContent: 'center' },
  searchButton: { padding: '0.5rem 1.5rem', margin: '0.25rem' },
  searchInput: { flexGrow: '1', margin: '0.25rem', padding: '0.25rem 1rem' }
});

function SearchPage() {
  const classes = useStyles();
  const [searchValue, setSearchValue, submitSearch] = useSubmitSearch();

  const submitOnEnter = event => {
    if (event.key === 'Enter') {
      submitSearch();
    }
  };

  return (
    <Container className={classes.container} maxWidth='md'>
      <Paper className={classes.searchInput} elevation={2}>
        <InputBase
          autoFocus={true}
          fullWidth={true}
          placeholder='Search for a card...'
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          onKeyPress={submitOnEnter}
        />
      </Paper>
      <Button
        className={classes.searchButton}
        variant='contained'
        color='secondary'
        onClick={submitSearch}
      >
        Search
      </Button>
    </Container>
  );
}

export default SearchPage;
