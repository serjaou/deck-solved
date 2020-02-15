import React from 'react';
import { Box, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return matches ? (
    <div>
      <IconButton color='inherit' aria-label='menu' onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Search</MenuItem>
        <MenuItem onClick={handleClose}>Build Deck</MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
      </Menu>
    </div>
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
