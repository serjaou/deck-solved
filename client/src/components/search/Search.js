import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Results } from './results';
import { tableFields, usePaginatedData } from '../../common';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: { padding: '0 2rem', backgroundColor: theme.palette.common.white },
  progress: { margin: '14rem 0 20rem' },
  progressBox: { textAlign: 'center' },
  text: { fontSize: '1.125rem', padding: '1.25rem 0' }
}));

const sortingFunctions = Object.assign(
  ...tableFields.map(field => ({ [field.name]: field.compare }))
);

function Search(props) {
  const paginatedData = usePaginatedData(undefined, sortingFunctions);
  const [dataLoaded, setDataLoaded] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    axios.get('api/cards/', { params: props.query }).then(
      cards => {
        if (cards.data && cards.data.length === 1) {
          history.push({
            pathname: `/cards/${encodeURIComponent(cards.data[0].name)}`,
            state: { card: cards.data[0] }
          });
        } else {
          paginatedData.setData(cards.data);
          setDataLoaded(true);
        }
      },
      error => console.log(error)
    );
    return () => {
      paginatedData.setData([]);
      setDataLoaded(false);
    };
  }, [props.query]);

  return (
    <Paper className={classes.container} elevation={2}>
      {dataLoaded ? (
        paginatedData.data.length > 0 ? (
          <div>
            <Typography className={classes.text} variant='body1'>
              {props.query.name ? `Showing results for "${props.query.name}".` : 'Showing results.'}
            </Typography>
            <Results paginatedData={paginatedData} tableFields={tableFields} />
          </div>
        ) : (
          <Typography className={classes.text} variant='body1'>
            {props.query.name
              ? `No results were found for "${props.query.name}".`
              : 'No results were found.'}
          </Typography>
        )
      ) : (
        <div>
          <Typography className={classes.text} variant='body1'>
            {props.query.name ? `Searching for "${props.query.name}".` : 'Searching...'}
          </Typography>
          <Box className={classes.progressBox}>
            <CircularProgress
              className={classes.progress}
              size={56}
              thickness={4.4}
              color='secondary'
            />
          </Box>
        </div>
      )}
    </Paper>
  );
}

export default Search;
