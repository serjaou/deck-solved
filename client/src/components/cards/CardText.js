import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CardSymbol from './CardSymbol';

const symbolRegex = /({\w+\/?\w?}|\n)/g;
const useStyles = makeStyles({
  symbol: {
    padding: '0.25rem'
  },
  text: {
    whiteSpace: 'pre-wrap'
  }
});

function CardText(props) {
  const classes = useStyles();
  const splittedText = props.text.split(symbolRegex).filter(item => item !== '');

  return splittedText.map((item, index) =>
    item[0] === '{' ? (
      <CardSymbol className={classes.symbol} key={index} symbol={item} margin={0.25} size={1} />
    ) : (
      <Typography className={classes.text} key={index} display='inline' variant='body1'>
        {item}
      </Typography>
    )
  );
}

export default CardText;
