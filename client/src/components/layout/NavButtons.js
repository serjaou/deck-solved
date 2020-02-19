import React from 'react';
import { Box, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = event => {
    const parsedRoute = event.target.innerText.toLowerCase().replace(/ /g, '-');
    history.push(`/${parsedRoute}`);
    setAnchorEl(null);
  };

  return matches ? (
    <div>
      <IconButton color='inherit' aria-label='menu' onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClick}
      >
        <MenuItem onClick={handleClick}>Search</MenuItem>
        <MenuItem onClick={handleClick}>Build Deck</MenuItem>
        <MenuItem onClick={handleClick}>About</MenuItem>
      </Menu>
    </div>
  ) : (
    <Box component='span'>
      <Button onClick={handleClick} className={classes.button} color='inherit'>
        Search
      </Button>
      <Button onClick={handleClick} className={classes.button} color='inherit'>
        Build Deck
      </Button>
      <Button onClick={handleClick} className={classes.button} color='inherit'>
        About
      </Button>
    </Box>
  );
}

export default NavButtons;
