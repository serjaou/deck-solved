import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardSymbol } from '../card';

// matches card symbols (e.g. "{R}").
const cardSymbol = /({\w+\/?\w?}|\n)/g;

const useStyles = makeStyles({
  symbol: { padding: '0.25rem' },
  text: { whiteSpace: 'pre-wrap', display: 'inline' }
});

// replace all card symbols in a text with their proper svg images.
function CardText(props) {
  const classes = useStyles();
  const splittedTextArray = props.text.split(cardSymbol).filter(item => item !== '');

  return splittedTextArray.map((item, index) =>
    item[0] === '{' ? (
      <CardSymbol className={classes.symbol} key={index} symbol={item} size={1} />
    ) : (
      <span className={classes.text} key={index}>
        {item}
      </span>
    )
  );
}

export default CardText;
