import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  image: {
    width: '100%',
    backgroundImage:
      'repeating-linear-gradient(-45deg, #CCC, #CCC 6px, #BBB 6px, #BBB 12px)',
    borderRadius: '4.75% / 3.5%',
    filter: 'drop-shadow(0.25rem 0.25rem 0.25rem #333)',
    webkitFilter: 'drop-shadow(0.25rem 0.25rem 0.25rem #333)'
  }
});

function CardImage(props) {
  const classes = useStyles();

  return (
    <img
      className={classes.image}
      src={props.card.image_uris ? props.card.image_uris[props.variant] : ''}
      alt={props.card.name ? props.card.name : ''}
    />
  );
}

export default CardImage;
