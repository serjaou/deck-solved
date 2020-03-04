import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Grid, Paper, useMediaQuery } from '@material-ui/core';
import { CardDetails, CardImage } from '../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  card: {
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
  const classes = useStyles();
  const [cardData, setCardData] = useState(props.card ? props.card : undefined);
  const [dataLoaded, setDataLoaded] = useState(props.card ? true : false);
  const matchesMd = useMediaQuery('(max-width:960px)');
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
        <Grid item>
          <Box className={classes.card}>
            <CardImage card={cardData} variant='png' />
          </Box>
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
