import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return <div className='footer'>CopyRight© {currentYear}, Sergio Guidi</div>;
}

export default Footer;
