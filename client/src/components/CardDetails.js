import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  artist: { padding: '1rem 1rem 1rem 1rem' },
  flavorText: { padding: '0 1rem 1rem 1rem', fontStyle: 'italic' },
  title: {
    padding: '2rem 1rem 0.5rem 0',
    fontWeight: '700',
    textAlign: 'end'
  },
  subtitle: {
    padding: '0.5rem 1rem 0.5rem 0',
    fontWeight: '600',
    textAlign: 'end'
  },
  text: { padding: '1rem 1rem 1rem 0', fontWeight: '500' }
}));

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
      <Typography className={classes.flavorText} align='right' variant='body2'>
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
      <Typography className={classes.artist} align='right' variant='body2'>
        <strong>Artist: </strong>
        <em>{props.card.artist}</em>
      </Typography>
    </div>
  );
}

export default CardPage;
