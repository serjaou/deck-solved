import React, { useState } from 'react';
import { Box, IconButton, Link, Menu, MenuItem, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  navButton: { fontWeight: '500', marginLeft: '1rem', paddingRight: '0' },
  menuButton: { marginLeft: '0.5rem', padding: '0.75rem 0.25rem' }
});

function NavButtons() {
  const classes = useStyles();
  const mediumOrSmallScreen = useMediaQuery('(max-width:800px)');
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return mediumOrSmallScreen ? (
    <div>
      <IconButton className={classes.menuButton} color='inherit' onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem>
          <Link href='/search' underline='none'>
            SEARCH
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href='/build-deck' underline='none'>
            BUILD DECK
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href='/about' underline='none'>
            ABOUT
          </Link>
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <Box component='span'>
      <Link className={classes.navButton} href='/search' color='inherit' underline='none'>
        SEARCH
      </Link>
      <Link className={classes.navButton} href='/build-deck' color='inherit' underline='none'>
        BUILD DECK
      </Link>
      <Link className={classes.navButton} href='/about' color='inherit' underline='none'>
        ABOUT
      </Link>
    </Box>
  );
}

export default NavButtons;
