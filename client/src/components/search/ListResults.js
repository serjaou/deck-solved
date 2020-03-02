import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: '18rem',
    width: matches => (matches ? '100%' : '18rem')
  }
});

function ListResults(props) {
  const matches = useMediaQuery('(max-width:600px)');
  const classes = useStyles(matches);

  return (
    <Grid container direction='row' spacing={1}>
      {props.cards.map(card => (
        <Grid className={classes.card} key={card.id} item>
          <p>{card.name}</p>
        </Grid>
      ))}
    </Grid>
  );
}

export default ListResults;
