import React from 'react';
import { Chip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: { display: 'flex', padding: '0.25rem' },
  leftBox: { marginRight: '0.25rem' }
});

function CardExtraInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftBox}>
        <Grid container spacing={1}>
          {Object.keys(props.cardData.legalities).map(format => (
            <Grid item key={format}>
              <Chip
                disabled={props.cardData.legalities[format] === 'not_legal'}
                color='secondary'
                label={<strong>{format}</strong>}
                size='small'
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <Grid container spacing={1}>
          {Object.keys(props.cardData.related_uris).map(uri => (
            <Grid item key={uri}>
              <Chip
                clickable
                label={<strong>{uri.replace(/_/g, ' ').toUpperCase()}</strong>}
                size='small'
                onClick={() => window.open(props.cardData.related_uris[uri], '_blank')}
                variant='outlined'
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default CardExtraInfo;
