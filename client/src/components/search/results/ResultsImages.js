import React from 'react';
import { Grid, Link, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

  // view-port media queries.
  const small = useMediaQuery('(max-width:512px)');
  const medium = useMediaQuery('(max-width:768px)');
  const large = useMediaQuery('(max-width:1024px)');
  const cardClass = small ? 'small' : medium ? 'medium' : large ? 'large' : 'default';

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
