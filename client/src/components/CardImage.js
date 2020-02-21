import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  large: {
    maxWidth: '24rem',
    webkitFilter: 'drop-shadow(0.25rem 0.25rem 0.25rem #333333)',
    filter: 'drop-shadow(0.25rem 0.25rem 0.25rem #333333)'
  },
  medium: { maxWidth: '16rem' },
  small: { maxWidth: '8rem' }
}));

function CardImage(props) {
  const classes = useStyles();

  return (
    <img
      className={classes[props.size]}
      src={props.card.image_uris[props.variant]}
      alt={props.card.name}
    />
  );
}

export default CardImage;
