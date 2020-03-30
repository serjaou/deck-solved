import React from 'react';
import { AppBar, Box, Container, Icon, InputBase, InputAdornment } from '@material-ui/core';
import { Link, Paper, Toolbar, useMediaQuery } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { NavButtons } from '../navbar';
import { useSubmitSearch } from '../../common';

const useStyles = makeStyles(theme => ({
  logo: { height: '2.25rem', cursor: 'pointer' },
  logoBox: { flexGrow: 1, marginRight: '1rem' },
  searchInput: { color: theme.palette.common.white },
  searchInputBox: { backgroundColor: theme.palette.primary.dark, padding: '0 0.5rem' },
  searchInputIcon: { color: theme.palette.grey.light, cursor: 'pointer' }
}));

function NavBar() {
  const classes = useStyles();
  const location = useLocation();
  const smallScreen = useMediaQuery('(max-width:599px)');
  const [searchValue, setSearchValue, submitSearch] = useSubmitSearch();

  const submitOnEnter = event => {
    if (event.key === 'Enter') {
      submitSearch();
    }
  };

  return (
    <AppBar position='static'>
      <Container className={classes.container} maxWidth='lg'>
        <Toolbar disableGutters>
          <Box component='span' className={classes.logoBox}>
            <Link href='/'>
              <img
                className={classes.logo}
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt='DECK SOLVED'
              />
            </Link>
          </Box>
          {// show search input only on medium-large screens & outside '/search' route.
          !(location.pathname === '/search' && location.search === '') && !smallScreen && (
            <Paper className={classes.searchInputBox}>
              <InputBase
                className={classes.searchInput}
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                onKeyPress={submitOnEnter}
                placeholder='Search...'
                endAdornment={
                  <InputAdornment position='end'>
                    <Icon onClick={submitSearch} className={classes.searchInputIcon}>
                      <SearchIcon />
                    </Icon>
                  </InputAdornment>
                }
              />
            </Paper>
          )}
          <NavButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
