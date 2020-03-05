import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Divider, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDataHandler } from '../../../common';
import { CardPage } from '../../../components';
import ImageResults from './ImageResults';
import ListResults from './ListResults';
import ResultsToolbar from './ResultsToolbar';
import tableFields from './_tableFields';
import axios from 'axios';

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
const comparingFunc = Object.assign(
  ...tableFields.map(field => ({ [field.name]: field.comparingFunc }))
);

function Results(props) {
  const [
    { items: results, finalPage, page, sortedField },
    { setData, setPage, sortByField }
  ] = useDataHandler(undefined, comparingFunc);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [format, setFormat] = useState('images');
  const classes = useStyles();

  useEffect(() => {
    axios.get('api/cards/', { params: { name: props.query } }).then(function(response) {
      setData(response.data);
      setDataLoaded(true);
    });
    return setData([]);
    // eslint-disable-next-line
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  return dataLoaded && results.length === 1 ? (
    <CardPage card={results[0]} />
  ) : dataLoaded ? (
    <Paper className={classes.page} elevation={2}>
      <ResultsToolbar
        format={format}
        setFormat={setFormat}
        page={page}
        setPage={setPage}
        sortedField={sortedField}
        sortByField={sortByField}
        tableFields={tableFields}
        finalPage={finalPage}
        query={props.query}
      />
      <Divider />
      <Box className={classes.centeredContainer}>
        {format === 'images' ? (
          <ImageResults
            cards={results}
            setPage={setPage}
            sortedField={sortedField}
            sortByField={sortByField}
          />
        ) : (
          <ListResults
            cards={results}
            setPage={setPage}
            sortedField={sortedField}
            sortByField={sortByField}
          />
        )}
      </Box>
      <Divider />
      <Box className={classes.centeredContainer}>
        <Pagination
          count={finalPage}
          color='secondary'
          page={page + 1}
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
