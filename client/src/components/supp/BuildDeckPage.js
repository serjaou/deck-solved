import React from 'react';
import { Container, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: { minHeight: '90vh', paddingBottom: '1rem', paddingTop: '1rem' },
  divider: { margin: '1rem 0' }
});

function BuildDeckPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='md'>
      <Typography variant='h4' align='justify'>
        <strong>BUILD DECK</strong>
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body1' align='justify'>
        <em>Coming soon...</em>
      </Typography>
    </Container>
  );
}

export default BuildDeckPage;
