import React from 'react';
import { Box, Button, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: '1rem'
  }
}));

function NavButtons() {
  const matches = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  return matches ? (
    <IconButton color='inherit' aria-label='menu'>
      <MenuIcon />
    </IconButton>
  ) : (
    <Box component='span'>
      <Button className={classes.button} color='inherit'>
        Search
      </Button>
      <Button className={classes.button} color='inherit'>
        Build Deck
      </Button>
      <Button className={classes.button} color='inherit'>
        About
      </Button>
    </Box>
  );
}

export default NavButtons;
