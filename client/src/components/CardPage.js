import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { CardDetails, CardImage } from '../components';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '2rem 4rem'
  }
}));

function CardPage(props) {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper} elevation={2}>
      <Grid container direction='row' spacing={1}>
        <Grid item xs={4}>
          <CardDetails card={props.card}/>
        </Grid>
        <Grid item xs={4}>
          <CardImage card={props.card} size='large' variant='png' />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Paper>
  );
}

export default CardPage;
