import React from 'react';
import { Grid, Link, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardImage } from '../../card';

const useStyles = makeStyles({
  // dynamic card-classes for grid responsiveness.
  small: { width: '49.8%', minWidth: '8rem' },
  medium: { width: '33.2%', minWidth: '10rem' },
  default: { width: '24.9%', minWidth: '12rem' }
});

function ResultsImages(props) {
  const classes = useStyles();

  // view-port media queries.
  const small = useMediaQuery('(max-width:599px)');
  const medium = useMediaQuery('(max-width:960px)');
  const cardClass = small ? 'small' : medium ? 'medium' : 'default';

  return (
    <Grid container direction='row' spacing={1}>
      {props.paginatedData.data.map(card => (
        <Grid className={classes[cardClass]} key={card.id} item>
          <Link href={`/cards/${encodeURIComponent(card.name)}`}>
            <CardImage card={card} variant='normal' />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default ResultsImages;
