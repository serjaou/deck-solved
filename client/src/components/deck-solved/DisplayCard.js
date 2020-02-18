import React from 'react';

function DisplayCard(props) {
  return (
    <img src={props.card.image_uris[props.variant]} alt={props.card.name} />
  );
}

export default DisplayCard;
