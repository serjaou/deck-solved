import React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { parseRoute } from '../../common';

const useStyles = makeStyles({
  button: {
    marginLeft: '1rem',
    paddingRight: '0'
  },
  menuButton: {
    marginLeft: '0.5rem',
    padding: '0.75rem 0.25rem'
  }
});

function NavButtons() {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery('(max-width:800px)');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = event => {
    closeMenu();
    const parsedRoute = parseRoute(event.currentTarget.innerText);
    history.push({ pathname: `/${parsedRoute}` });
  };

  return matches ? (
    <div>
      <IconButton
        className={classes.menuButton}
        color='inherit'
        aria-label='menu'
        onClick={openMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
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
