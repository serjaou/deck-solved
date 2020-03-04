import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { CardImage } from '../../components';

const useStyles = makeStyles({
  card: {
    maxWidth: '18rem',
    width: matches => (matches ? '100%' : '18rem')
  }
});

function ImageResults(props) {
  const matches = useMediaQuery('(max-width:600px)');
  const classes = useStyles(matches);
  const history = useHistory();

  const handleClick = name => {
    history.push({
      pathname: `/cards/${name}`
    });
  };

  return (
    <Grid container direction='row' spacing={1}>
      {props.cards.map(card => (
        <Grid className={classes.card} key={card.id} item>
          <CardImage onClickHandler={() => handleClick(card.name)} card={card} variant='normal' />
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageResults;
