import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Icon, InputBase, useMediaQuery } from '@material-ui/core';
import { InputAdornment, Paper, Toolbar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import NavButtons from './NavButtons';
import { useSubmitSearch } from '../search';

const useStyles = makeStyles(theme => ({
  container: { padding: '0 2rem' },
  icon: { color: theme.palette.grey.light, cursor: 'pointer' },
  input: { color: theme.palette.common.white },
  logo: { height: '2.25rem', cursor: 'pointer' },
  logoBox: { flexGrow: 1, marginRight: '1rem' },
  paper: { backgroundColor: theme.palette.primary.dark, padding: '0 0.5rem' }
}));

function NavBar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const matchesSmallScreen = useMediaQuery('(max-width:600px)');
  const [value, setValue, handleSubmit] = useSubmitSearch();

  const handleClick = () => {
    history.push({ pathname: '/' });
  };
  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleClickSubmit = () => {
    handleSubmit();
    setValue('');
  };
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleClickSubmit();
    }
  };

  return (
    <AppBar position='static'>
      <Container className={classes.container} maxWidth='lg'>
        <Toolbar disableGutters>
          <Box component='span' className={classes.logoBox}>
            <img
              onClick={handleClick}
              className={classes.logo}
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt='logo'
            />
          </Box>
          {!(location.pathname === '/search' && location.search === '') && !matchesSmallScreen && (
            <Paper className={classes.paper}>
              <InputBase
                className={classes.input}
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder='Search...'
                endAdornment={
                  <InputAdornment position='end'>
                    <Icon onClick={handleClickSubmit} className={classes.icon}>
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
