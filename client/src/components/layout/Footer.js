import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  container: { padding: '0.5rem', textAlign: 'center' }
});

function Footer() {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <Container className={classes.container} maxWidth='sm'>
      CopyRight© {currentYear}, Sergio Guidi
    </Container>
  );
}

export default Footer;
