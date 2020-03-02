import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Box, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { useDataHandler } from '../../common';
import { CardImage } from '../../components';

const useStyles = makeStyles({
  card: {
    maxWidth: '18rem',
    width: matches => (matches ? '100%' : '18rem')
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '1rem 0'
  },
  page: { padding: '0 2rem' },
  resultsTitle: { flexGrow: '1' }
});

function MultipleResults(props) {
  const [data, metaData, setPage] = useDataHandler(props.cards, 24);
  const matches = useMediaQuery('(max-width:600px)');
  const classes = useStyles(matches);

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  return data ? (
    <Paper className={classes.page} elevation={2}>
      <Box className={classes.content}>
        <Typography className={classes.resultsTitle} variant='h6'>
          Showing results for "{props.query}".
        </Typography>
        <Pagination
          count={metaData.endingPage}
          color='secondary'
          page={metaData.page + 1}
          onChange={handleChange}
        />
      </Box>
      <Divider />
      <Box className={classes.content}>
        <Grid container direction='row' spacing={1}>
          {data.map(card => (
            <Grid className={classes.card} key={card.id} item>
              <CardImage card={card} variant='normal' />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
      <Box className={classes.content}>
        <Pagination
          count={metaData.endingPage}
          color='secondary'
          page={metaData.page + 1}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  ) : (
    <h6>loading</h6>
  );
}

export default MultipleResults;
