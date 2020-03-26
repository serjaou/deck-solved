import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { CardImage } from '../../card';

const useStyles = makeStyles({
  card: {
    maxWidth: '19rem',
    width: matches => (matches ? '100%' : '19rem')
  },
  container: {
    justifyContent: 'center'
  }
});

function ImageResults(props) {
  const matches = useMediaQuery('(max-width:600px)');
  const classes = useStyles(matches);
  const history = useHistory();

  const handleClick = card => {
    history.push({
      pathname: `/cards/${encodeURIComponent(card.name)}`,
      state: { card }
    });
  };

  return (
    <Grid container className={classes.container} direction='row' spacing={1}>
      {props.cards.map(card => (
        <Grid className={classes.card} key={card.id} item>
          <CardImage onClickHandler={() => handleClick(card)} card={card} variant='normal' />
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageResults;
