import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  symbolImage: {
    boxShadow: '-1px 1px 0 rgba(0,0,0,0.85)',
    display: 'inline-block',
    margin: '0 0.0625rem',
    borderRadius: props => `${props.size / 2}rem`,
    height: props => `${props.size}rem`,
    width: props => `${props.size}rem`
  }
});

function CardSymbol(props) {
  const classes = useStyles(props);

  // remove curly braces from symbol (e.g. "{GU}" -> "GU").
  const baredSymbol = props.symbol.match(/\w/g).join('');

  return (
    <img
      className={classes.symbolImage}
      src={`https://svgs.scryfall.io/card-symbols/${baredSymbol}.svg`}
      alt={props.symbol}
    />
  );
}

export default CardSymbol;
