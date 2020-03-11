import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import CardText from './CardText';

const useStyles = makeStyles({
  body: {
    padding: '1rem 0 1rem 1rem',
    fontWeight: '400'
  },
  flavorText: {
    padding: '0 0 1rem 1rem',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  subtitle: {
    padding: '0.5rem 0 0.5rem 1rem',
    fontWeight: '500'
  },
  title: {
    marginTop: '1rem',
    padding: '1rem 0 1rem 1rem',
    fontWeight: '700'
  }
});

function CardPage(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title}>
        <Typography display='inline' variant='h5'>
          <strong>{props.card.name}</strong>
        </Typography>
        {props.card.mana_cost && (
          <span className={classes.body}>
            <CardText text={props.card.mana_cost} />
          </span>
        )}
      </div>
      <Divider />
      <Typography className={classes.subtitle} variant='subtitle1'>
        {props.card.type_line}
      </Typography>
      <Divider />
      <div className={classes.body}>
        <CardText text={props.card.oracle_text} />
      </div>
      {props.card.flavor_text && (
        <Typography className={classes.flavorText} variant='body2'>
          {props.card.flavor_text}
        </Typography>
      )}
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
          <Typography className={classes.subtitle} variant='subtitle1'>
            <strong>Loyalty: </strong>
            {props.card.loyalty}
          </Typography>
          <Divider />
        </div>
      )}
      <Typography className={classes.body} variant='body2'>
        <strong>Artist: </strong>
        <em>{props.card.artist}</em>
      </Typography>
    </div>
  );
}

export default CardPage;
