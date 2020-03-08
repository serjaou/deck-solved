import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  symbolImage: {
    height: '1rem',
    width: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '-1px 1px 0 rgba(0,0,0,0.85)'
  }
});

function CardSymbol(props) {
  const classes = useStyles();
  const baredSymbol = props.symbol.slice(1, -1);

  return (
    <img
      className={classes.symbolImage}
      src={`https://img.scryfall.com/symbology/${baredSymbol}.svg`}
      alt={props.symbol}
    />
  );
}

export default CardSymbol;
