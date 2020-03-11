import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, Paper, useMediaQuery } from '@material-ui/core';
import FlipToFrontOutlined from '@material-ui/icons/FlipToFrontOutlined';
import { useParams } from 'react-router-dom';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import CardRulings from './CardRulings';
import axios from 'axios';

const useStyles = makeStyles({
  image: {
    height: matches => (matches.sm ? '100%' : '38.25rem'),
    maxWidth: '26rem',
    width: '100%'
  },
  grid: {
    justifyContent: matches => (matches.md ? 'center' : 'space-between')
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
  const sm = useMediaQuery('(max-width:600px)');
  const md = useMediaQuery('(max-width:960px)');
  const classes = useStyles({ sm, md });

  // If the component it is called with empty data,
  // infer the card info from the URL params and send a request to the server.
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
    <Paper className={classes.paper} elevation={2}>
      <Grid container className={classes.grid} direction='row' spacing={2}>
        <Grid item xs={12} md={4} className={classes.image}>
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
        <Grid item xs={12} md={4}>
          <CardDetails cardData={cardData} card={card[currentFace]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardRulings oracle_id={cardData.oracle_id} />
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <CircularProgress color='secondary' />
  );
}

export default CardPage;
