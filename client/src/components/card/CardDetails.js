import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardText } from '../card';

const useStyles = makeStyles({
  container: { paddingLeft: '0.25rem', paddingTop: '1rem' },
  text: { padding: '0.5rem 0' }
});

function CardDetails(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <Typography display='inline' variant='h5'>
          <strong>{props.card.name}&nbsp;</strong>
        </Typography>
        {props.card.mana_cost && <CardText text={props.card.mana_cost} />}
      </div>
      <Divider />
      <Typography className={classes.text} variant='subtitle1'>
        {props.card.type_line}
      </Typography>
      <Divider />
      <Typography className={classes.text} variant='body1'>
        <CardText text={props.card.oracle_text} />
      </Typography>
      {props.card.flavor_text && (
        <Typography className={classes.text} variant='body1'>
          <em>
            <CardText text={props.card.flavor_text} />
          </em>
        </Typography>
      )}
      <Divider />
      {props.card.power && (
        <div>
          <Typography className={classes.text} variant='subtitle1'>
            {props.card.power + '/' + props.card.toughness}
          </Typography>
          <Divider />
        </div>
      )}
      {props.card.loyalty && (
        <div>
          <Typography className={classes.text} variant='subtitle1'>
            {props.card.loyalty}&nbsp;<em>(loyalty)</em>
          </Typography>
          <Divider />
        </div>
      )}
      <Typography className={classes.text} variant='subtitle1'>
        Illustrated by&nbsp;<em>{props.card.artist}</em>
      </Typography>
    </div>
  );
}

export default CardDetails;
