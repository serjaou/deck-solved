import React from 'react';
import { Container, Divider, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: { minHeight: '90vh', paddingBottom: '1rem', paddingTop: '1rem' },
  divider: { margin: '1rem 0' }
});

function AboutPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='md'>
      <Typography variant='h4' align='justify'>
        <strong>ABOUT</strong>
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body1' align='justify'>
        Deck Solved is a <strong>simple</strong>, <strong>easy-to-use</strong> and
        <strong>&nbsp;user-friendly</strong> Magic The Gathering web-application which can be used
        as a card reference.
        <br />
        <br />
        The application consumes&nbsp;
        <Link href='https://www.scryfall.com/'>
          <strong>Scryfall.com</strong>
        </Link>
        &nbsp;card data and image database which follows the&nbsp;
        <Link href='https://company.wizards.com/fancontentpolicy'>
          <strong>Wizards of the Coast Fan Content Policy</strong>
        </Link>
        , which is free of charge for the primary purpose of creating additional Magic software,
        performing research, or creating community content about Magic and related products.
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='h6' align='justify'>
        <strong>Contact:</strong>
      </Typography>
      <Typography variant='body1' align='justify'>
        <em>
          Sergio Guidi
          <br />
          serjaou@gmail.com
          <br />
          (+591) 7932-5050
        </em>
      </Typography>
      <Divider className={classes.divider} />
    </Container>
  );
}

export default AboutPage;
