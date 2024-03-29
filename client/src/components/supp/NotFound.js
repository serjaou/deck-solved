import React from 'react';
import { Container, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: { minHeight: '90vh', paddingBottom: '1rem', paddingTop: '1rem' },
  divider: { margin: '1rem 0' }
});

function NotFound() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='md'>
      <Typography variant='h4' align='justify'>
        <strong>NOT FOUND</strong>
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body1' align='justify'>
        The URL that you are trying to access doesn't exist.
      </Typography>
    </Container>
  );
}

export default NotFound;
