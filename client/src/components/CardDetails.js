import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  artist: {
    padding: '1rem 0 1rem 1rem'
  },
  flavorText: {
    padding: '0 0 1rem 1rem',
    fontStyle: 'italic'
  },
  title: {
    padding: '2rem 0 0.5rem 1rem',
    fontWeight: '700'
  },
  subtitle: {
    padding: '0.5rem 0 0.5rem 1rem',
    fontWeight: '600'
  },
  text: {
    whiteSpace: 'pre-wrap',
    padding: '1rem 0 1rem 1rem',
    fontWeight: '400'
  }
});

function CardPage(props) {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title} variant='h5'>
        {props.card.name}
      </Typography>
      <Divider />
      <Typography className={classes.subtitle} variant='subtitle1'>
        {props.card.type_line}
      </Typography>
      <Divider />
      {props.card.mana_cost && (
        <div>
          <Typography className={classes.subtitle} variant='subtitle2'>
            {props.card.mana_cost}
          </Typography>
          <Divider />
        </div>
      )}
      <Typography className={classes.text} align='justify' variant='body1'>
        {props.card.oracle_text}
      </Typography>
      <Typography className={classes.flavorText} variant='body2'>
        {props.card.flavor_text}
      </Typography>
      <Divider />
      {props.card.power && (
        <div>
          <Typography className={classes.subtitle} variant='subtitle1'>
            {props.card.power + '/' + props.card.toughness}
          </Typography>
          <Divider />
        </div>
      )}
      {props.card.loyalty && (
        <div>
          <Typography className={classes.text} variant='subtitle1'>
            <strong>Loyalty: </strong>
            {props.card.loyalty}
          </Typography>
          <Divider />
        </div>
      )}
      <Typography className={classes.artist} variant='body2'>
        <strong>Artist: </strong>
        <em>{props.card.artist}</em>
      </Typography>
    </div>
  );
}

export default CardPage;
