import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import FlipToFrontOutlined from '@material-ui/icons/FlipToFrontOutlined';
import { CardDetails, CardExtraInfo, CardImage, CardRulings } from '../card';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  imageBox: { maxWidth: '26rem' },
  container: { backgroundColor: theme.palette.common.white, padding: '1rem 2rem' },
  transformButton: { textAlign: 'center', paddingTop: '0.5rem' }
}));

function CardPage() {
  const [cardData, setCardData] = useState(undefined);
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
        response => {
          if (response.data.length > 0) {
            setCardData(response.data[0]);
          }
          setDataLoaded(true);
        },
        error => {
          console.log(error);
          setDataLoaded(true);
        }
      );
    return () => {
      setCardData([]);
      setDataLoaded(false);
      setCurrentFace('front');
    };
  }, [cardName]);

  // two-faced cards logic, 'front' by default.
  const cardFaces =
    cardData && cardData.layout === 'transform'
      ? { front: cardData.card_faces[0], back: cardData.card_faces[1] }
      : { front: cardData };

  const transformCard = () => {
    setCurrentFace(currentFace === 'front' ? 'back' : 'front');
  };

  return dataLoaded ? (
    <Paper className={classes.container} elevation={2}>
      {cardData ? (
        <Grid container justify='center' spacing={2}>
          <Grid item xs={12} sm={6} md={4} className={classes.imageBox}>
            <CardImage card={cardFaces[currentFace]} variant='png' />
            {cardData.layout === 'transform' && (
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
            <CardDetails card={cardFaces[currentFace]} />
            <CardExtraInfo cardData={cardData} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CardRulings oracle_id={cardData.oracle_id} />
          </Grid>
        </Grid>
      ) : (
        <Typography variant='body1'>{`There is no card named ${cardName}.`}</Typography>
      )}
    </Paper>
  ) : (
    <Paper className={classes.container} elevation={2}>
      <Grid container justify='center'>
        <CircularProgress color='secondary' />
      </Grid>
    </Paper>
  );
}

export default CardPage;
