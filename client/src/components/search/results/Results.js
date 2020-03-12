import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Divider, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDataHandler } from '../../../common';
import { CardPage } from '../../cards';
import ImageResults from './ImageResults';
import ListResults from './ListResults';
import ResultsToolbar from './ResultsToolbar';
import tableFields from './_tableFields';
import axios from 'axios';
import $ from 'jquery';

const useStyles = makeStyles({
  centeredContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0.75rem 0'
  },
  page: { padding: '0 2rem' },
  progress: { margin: '14rem 0 20rem' },
  resultsText: { fontSize: '1.125rem', padding: '1.25rem 0' }
});
const sortingFunctions = Object.assign(
  ...tableFields.map(field => ({ [field.name]: field.compare.bind(field) }))
);

function Results(props) {
  const results = useDataHandler(undefined, sortingFunctions);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [format, setFormat] = useState('images');
  const classes = useStyles();

  useEffect(() => {
    axios.get('api/cards/', { params: { name: props.query } }).then(function(response) {
      results.setData(response.data);
      setDataLoaded(true);
    });
    return () => {
      results.setData([]);
      setDataLoaded(false);
      setFormat('images');
    };
    // eslint-disable-next-line
  }, [props.query]);

  const handlePageChange = (event, value) => {
    results.setPage(value - 1);
    $('html,body').scrollTop(0);
  };

  return dataLoaded && results.data.length === 1 ? (
    <CardPage card={results.data[0]} />
  ) : dataLoaded ? (
    <Paper className={classes.page} elevation={2}>
      <ResultsToolbar
        results={results}
        format={format}
        setFormat={setFormat}
        tableFields={tableFields}
        query={props.query}
      />
      <Divider />
      <Box className={classes.centeredContainer}>
        {format === 'images' ? (
          <ImageResults
            cards={results.data}
            setPage={results.setPage}
            sortedField={results.sortedField}
            sortByField={results.sortByField}
          />
        ) : (
          <ListResults
            cards={results.data}
            setPage={results.setPage}
            sortedField={results.sortedField}
            sortByField={results.sortByField}
          />
        )}
      </Box>
      <Divider />
      <Box className={classes.centeredContainer}>
        <Pagination
          count={results.finalPage}
          color='secondary'
          page={results.currentPage + 1}
          onChange={handlePageChange}
        />
      </Box>
    </Paper>
  ) : (
    <Paper className={classes.page} elevation={2}>
      <Typography className={classes.resultsText} variant='subtitle1'>
        Searching for <strong>"{props.query}"</strong>.
      </Typography>
      <Box className={classes.centeredContainer}>
        <CircularProgress
          className={classes.progress}
          size={56}
          thickness={4.4}
          color='secondary'
        />
      </Box>
    </Paper>
  );
}

export default Results;
