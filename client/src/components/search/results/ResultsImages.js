import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { CardImage } from '../../card';

const useStyles = makeStyles({
  // dynamic card-classes for grid responsiveness.
  small: { width: '98.5%', minWidth: '14rem' },
  medium: { width: '49.25%', minWidth: '14rem' },
  large: { width: '32.75%', minWidth: '14rem' },
  default: { width: '24.5%', minWidth: '14rem' }
});

function ResultsImages(props) {
  const classes = useStyles();
  const history = useHistory();

  // view-port media queries.
  const small = useMediaQuery('(max-width:512px)');
  const medium = useMediaQuery('(max-width:768px)');
  const large = useMediaQuery('(max-width:1024px)');
  const cardClass = small ? 'small' : medium ? 'medium' : large ? 'large' : 'default';

  const gotoCardPage = card => {
    history.push({
      pathname: `/cards/${encodeURIComponent(card.name)}`,
      state: { card }
    });
  };

  return (
    <Grid container direction='row' spacing={1}>
      {props.paginatedData.data.map(card => (
        <Grid className={classes[cardClass]} key={card.id} item>
          <CardImage onClickHandler={() => gotoCardPage(card)} card={card} variant='normal' />
        </Grid>
      ))}
    </Grid>
  );
}

export default ResultsImages;
