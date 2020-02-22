import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import NavButtons from './NavButtons';

const useStyles = makeStyles({
  container: {
    padding: '0 3rem'
  },
  title: {
    flexGrow: 1
  }
});

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Container className={classes.container} maxWidth='lg'>
        <Toolbar disableGutters>
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
