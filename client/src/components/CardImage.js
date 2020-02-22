import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  image: {
    maxWidth: props => props.size,
    width: '100%',
    filter: 'drop-shadow(0.25rem 0.25rem 0.25rem #333333)',
    webkitFilter: 'drop-shadow(0.25rem 0.25rem 0.25rem #333333)'
  }
});

function CardImage(props) {
  const classes = useStyles(props);

  return (
    <img
      className={classes.image}
      src={props.card.image_uris[props.variant]}
      alt={props.card.name}
    />
  );
}

export default CardImage;
