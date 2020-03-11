import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, Paper, useMediaQuery } from '@material-ui/core';
import FlipToFrontOutlined from '@material-ui/icons/FlipToFrontOutlined';
import { useParams } from 'react-router-dom';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import axios from 'axios';

const useStyles = makeStyles({
  image: {
    height: matches => (matches ? '100%' : '38.25rem'),
    maxWidth: '26rem',
    width: '100%'
  },
  grid: {
    justifyContent: 'center'
  },
  paper: {
    backgroundImage: 'url("/bg-paper.png")',
    padding: '1rem 2rem'
  },
  transform: {
    textAlign: 'center',
    paddingTop: '0.375rem'
  }
});

function CardPage(props) {
  const [cardData, setCardData] = useState(props.card ? props.card : undefined);
  const [dataLoaded, setDataLoaded] = useState(props.card ? true : false);
  const [currentFace, setCurrentFace] = useState('front');
  const matchesSm = useMediaQuery('(max-width:600px)');
  const matchesMd = useMediaQuery('(max-width:960px)');
  const classes = useStyles(matchesSm);

  // If the component it is called with empty data,
  // infer the card info it from the URL params and obtain the data from the server.
  const { name: query } = useParams();
  useEffect(() => {
    if (query) {
      axios.get(`/api/cards/${query}`).then(response => {
        setCardData(response.data);
        setDataLoaded(true);
      });
    }
  }, [query]);

  const handleClick = () => {
    setCurrentFace(currentFace === 'front' ? 'back' : 'front');
  };

  // Two-faced cards logic, 'front' face by default.
  const card =
    cardData && cardData.layout === 'transform'
      ? { front: cardData.card_faces[0], back: cardData.card_faces[1] }
      : { front: cardData };

  return dataLoaded ? (
    <Paper className={classes.paper} elevation={3}>
      <Grid container className={matchesMd ? classes.grid : undefined} direction='row' spacing={2}>
        <Grid item xs={12} md={6} className={classes.image}>
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
        <Grid item xs={12} md={6}>
          <CardDetails card={card[currentFace]} />
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <CircularProgress color='secondary' />
  );
}

export default CardPage;
