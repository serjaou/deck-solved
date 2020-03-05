import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Paper, useMediaQuery } from '@material-ui/core';
import { CardDetails, CardImage } from '../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  card: {
    height: matches => (matches ? '' : '34rem'),
    maxWidth: '24rem',
    width: '100%'
  },
  grid: {
    justifyContent: 'center'
  },
  paper: {
    backgroundImage: 'url("/bg-paper.png")',
    padding: '1rem 2rem'
  }
});

function CardPage(props) {
  const [cardData, setCardData] = useState(props.card ? props.card : undefined);
  const [dataLoaded, setDataLoaded] = useState(props.card ? true : false);
  const matchesSm = useMediaQuery('(max-width:600px)');
  const matchesMd = useMediaQuery('(max-width:960px)');
  const classes = useStyles(matchesSm);
  const { name: query } = useParams();

  useEffect(() => {
    if (query) {
      axios.get(`/api/cards/${query}`).then(response => {
        setCardData(response.data);
        setDataLoaded(true);
      });
    }
  }, [query]);

  return dataLoaded ? (
    <Paper className={classes.paper} elevation={2}>
      <Grid container className={matchesMd ? classes.grid : undefined} direction='row' spacing={2}>
        <Grid item className={classes.card}>
          <CardImage card={cardData} variant='png' />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardDetails card={cardData} />
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <CircularProgress color='secondary' />
  );
}

export default CardPage;
