import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyle = makeStyles({
  container: {
    padding: '0.5rem',
    textAlign: 'center'
  }
});

function Footer() {
  const containerClass = useStyle().container;
  const currentYear = new Date().getFullYear();
  return (
    <Container className={containerClass} maxWidth='sm'>
      CopyRight© {currentYear}, Sergio Guidi
    </Container>
  );
}

export default Footer;
