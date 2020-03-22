import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from 'react-router-dom';
import FlipToFrontOutlined from '@material-ui/icons/FlipToFrontOutlined';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import CardRulings from './CardRulings';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: '26rem',
    width: '100%'
  },
  grid: {
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: '1rem 2rem'
  },
  transform: {
    textAlign: 'center',
    paddingTop: '0.375rem'
  }
}));

function CardPage() {
  const location = useLocation();
  const hasStartingData = location.state && location.state.card;
  const [cardData, setCardData] = useState(hasStartingData ? location.state.card : undefined);
  const [dataLoaded, setDataLoaded] = useState(hasStartingData ? true : false);
  const [currentFace, setCurrentFace] = useState('front');
  const classes = useStyles();

  // If the component it is called with empty card-data,
  // infer the card name from the URL params and obtain the data from the server.
  const { name: query } = useParams();
  useEffect(() => {
    if (!hasStartingData && query) {
      axios
        .get('/api/cards/', {
          params: { name: decodeURIComponent(query) }
        })
        .then(
          response => {
            if (response.data.length > 0) {
              setCardData(response.data[0]);
            }
            setDataLoaded(true);
          },
          error => console.log(error)
        );
    }
    return () => {
      setCardData([]);
      setDataLoaded(false);
      setCurrentFace('front');
    };
  }, [hasStartingData, query]);

  const handleClick = () => {
    setCurrentFace(currentFace === 'front' ? 'back' : 'front');
  };

  // Two-faced cards logic, 'front' face by default.
  const card =
    cardData && cardData.layout === 'transform'
      ? { front: cardData.card_faces[0], back: cardData.card_faces[1] }
      : { front: cardData };

  return dataLoaded ? (
    cardData ? (
      <Paper className={classes.paper} elevation={2}>
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={12} sm={6} md={4} className={classes.image}>
            <CardImage card={card[currentFace]} variant='png' />
            {cardData.layout === 'transform' && (
              <div className={classes.transform}>
                <Button
                  variant='contained'
                  color='secondary'
                  endIcon={<FlipToFrontOutlined />}
                  onClick={() => handleClick()}
                  size='small'
                >
                  Transform
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardDetails cardData={cardData} card={card[currentFace]} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CardRulings oracle_id={cardData.oracle_id} />
          </Grid>
        </Grid>
      </Paper>
    ) : (
      <Paper className={classes.paper} elevation={2}>
        <Typography variant='subtitle1'>{`There is no card named ${query}.`}</Typography>
      </Paper>
    )
  ) : (
    <CircularProgress color='secondary' />
  );
}

export default CardPage;
