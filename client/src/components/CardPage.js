import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, useMediaQuery } from '@material-ui/core';
import { CardDetails, CardImage } from '../components';

const useStyles = makeStyles({
  grid: {
    justifyContent: 'center'
  },
  paper: {
    backgroundImage: 'url("/bg-paper.png")',
    padding: '1.5rem 3rem'
  }
});

function CardPage(props) {
  const classes = useStyles();
  const matchesImg = useMediaQuery('(max-width:464px)');
  const matchesMd = useMediaQuery('(max-width:960px)');

  return (
    <Paper square className={classes.paper} elevation={2}>
      <Grid
        container
        className={matchesMd ? classes.grid : undefined}
        direction='row'
        spacing={2}
      >
        <Grid item className={matchesImg ? classes.cardImage : undefined}>
          <CardImage card={props.card} shadow={true} size='24rem' variant='png' />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardDetails card={props.card} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CardPage;
