import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Icon, InputBase } from '@material-ui/core';
import { InputAdornment, Paper, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NavButtons from './NavButtons';
import { useSubmitSearch } from '../search';

const useStyles = makeStyles(theme => ({
  icon: { color: theme.palette.gray.light },
  input: { color: theme.palette.common.white },
  container: { padding: '0 2rem' },
  paper: { backgroundColor: theme.palette.primary.dark, padding: '0 0.5rem' },
  title: { flexGrow: 1 }
}));

function NavBar() {
  const classes = useStyles();
  const [value, setValue, handleSubmit] = useSubmitSearch();

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSubmit();
      setValue('');
    }
  };

  return (
    <AppBar position='static'>
      <Container className={classes.container} maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography variant='h6' className={classes.title}>
            Deck Solved
          </Typography>
          <Paper className={classes.paper}>
            <InputBase
              className={classes.input}
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder='Search...'
              endAdornment={
                <InputAdornment position='end'>
                  <Icon className={classes.icon}>
                    <SearchIcon />
                  </Icon>
                </InputAdornment>
              }
            />
          </Paper>
          <NavButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
