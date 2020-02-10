import React from 'react';

function NavBar() {
  return (
    <div className='nav-bar'>
      <span className='brand'>Deck Solved</span>
      <span className='links'>
        <a href='/'>Search</a>
        <a href='/'>Build Deck</a>
        <a href='/'>My Account</a>
      </span>
    </div>
  );
}

export default NavBar;
