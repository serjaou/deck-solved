import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, useMediaQuery } from '@material-ui/core';
import { CardDetails, CardImage } from '../components';

const useStyles = makeStyles({
  card: { maxWidth: '24rem', width: '100%' },
  grid: { justifyContent: 'center' },
  paper: { backgroundImage: 'url("/bg-paper.png")', padding: '1rem 2rem' }
});

function CardPage(props) {
  const classes = useStyles();
  const matchesMd = useMediaQuery('(max-width:960px)');

  return (
    <Paper className={classes.paper} elevation={2}>
      <Grid
        container
        className={matchesMd ? classes.grid : undefined}
        direction='row'
        spacing={2}
      >
        <Grid item>
          <Box className={classes.card}>
            <CardImage card={props.card} variant='png' />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardDetails card={props.card} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CardPage;
