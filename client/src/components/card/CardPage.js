import React, { useEffect, useState } from 'react';
import { Button, Container, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import FlipToFrontOutlined from '@material-ui/icons/FlipToFrontOutlined';
import { CardDetails, CardExtraInfo, CardImage, CardRulings } from '../card';
import { isMultipleFaced } from '../../common';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: { minHeight: '90vh', paddingTop: '1rem', paddingBottom: '1rem' },
  imageBox: { maxWidth: '26rem' },
  paper: { backgroundColor: theme.palette.common.white },
  transformButton: { textAlign: 'center', paddingTop: '0.5rem' }
}));

function CardPage() {
  const [card, setCard] = useState(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentFace, setCurrentFace] = useState('front');
  const { name: cardName } = useParams();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get('/api/cards/', {
        params: { name: decodeURIComponent(cardName) }
      })
      .then(
        card => {
          if (card.data[0]) {
            setCard(card.data[0]);
          }
          setDataLoaded(true);
        },
        error => {
          console.log(error);
          setDataLoaded(true);
        }
      );
    return () => {
      setCard([]);
      setDataLoaded(false);
      setCurrentFace('front');
    };
  }, [cardName]);

  // two-faced cards logic, 'front' by default.
  const cardFaces =
    card && (card.layout === 'transform' || card.layout === 'art_series')
      ? { front: card.card_faces[0], back: card.card_faces[1] }
      : { front: card };

  const transformCard = () => {
    setCurrentFace(currentFace === 'front' ? 'back' : 'front');
  };

  return (
    <Paper className={classes.paper} elevation={2}>
      <Container className={classes.container} maxWidth='lg'>
        {dataLoaded ? (
          card ? (
            <Grid container justify='center' spacing={2}>
              <Grid item xs={12} sm={6} md={4} className={classes.imageBox}>
                <CardImage card={cardFaces[currentFace]} variant='png' />
                {(card.layout === 'transform' || card.layout === 'art_series') && (
                  <div className={classes.transformButton}>
                    <Button
                      variant='contained'
                      color='secondary'
                      endIcon={<FlipToFrontOutlined />}
                      onClick={transformCard}
                      size='small'
                    >
                      Transform
                    </Button>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {isMultipleFaced(card) ? (
                  <div>
                    <CardDetails card={card.card_faces[0]} />
                    <CardDetails card={card.card_faces[1]} />
                  </div>
                ) : (
                  <CardDetails card={card} />
                )}
                <CardExtraInfo card={card} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CardRulings oracle_id={card.oracle_id} />
              </Grid>
            </Grid>
          ) : (
            <Typography variant='body1'>{`There is no card named ${cardName}.`}</Typography>
          )
        ) : (
          <Grid container justify='center'>
            <CircularProgress color='secondary' />
          </Grid>
        )}
      </Container>
    </Paper>
  );
}

export default CardPage;
