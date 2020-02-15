import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import NavButtons from './NavButtons';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Deck Solved
          </Typography>
          <NavButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
