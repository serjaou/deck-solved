import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Divider, Paper, Typography } from '@material-ui/core';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import { useDataHandler } from '../../common';
import { CardPage } from '../../components';
import ImageResults from './ImageResults';
import ListResults from './ListResults';
import axios from 'axios';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '1rem 0'
  },
  format: {
    margin: 'auto 1rem auto 0',
    minWidth: '5rem'
  },
  formatButton: {
    maxHeight: '2.25rem'
  },
  page: {
    padding: '0 2rem'
  },
  resultsTitle: {
    alignSelf: 'center',
    flexGrow: '1',
    padding: '0.375rem 0'
  }
});

function Results(props) {
  const [results, metadata, setResults, setPage] = useDataHandler(24);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [format, setFormat] = useState('images');
  const classes = useStyles();

  useEffect(() => {
    axios
      .get('api/cards/', {
        params: { name: props.query }
      })
      .then(function(response) {
        setResults(response.data);
        setDataLoaded(true);
      });
  // eslint-disable-next-line
  }, [props.query]);

  const handleFormat = (event, format) => {
    setFormat(format);
  };
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  return dataLoaded && results.length === 1 ? (
    <CardPage card={results[0]} />
  ) : (
    <Paper className={classes.page} elevation={2}>
      <Box className={classes.content}>
        <div className={classes.format}>
          {dataLoaded && (
            <ToggleButtonGroup size='small' value={format} onChange={handleFormat} exclusive>
              <ToggleButton className={classes.formatButton} value='list'>
                <ListIcon />
              </ToggleButton>
              <ToggleButton className={classes.formatButton} value='images'>
                <AppsIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </div>
        <Typography className={classes.resultsTitle} variant='body1'>
          Showing results for <strong>"{props.query}"</strong>.
        </Typography>
        {dataLoaded && (
          <Pagination
            count={metadata.endingPage}
            color='secondary'
            page={metadata.page + 1}
            onChange={handleChange}
          />
        )}
      </Box>
      <Divider />
      <Box className={classes.content}>
        {dataLoaded ? (
          format === 'images' ? (
            <ImageResults cards={results} />
          ) : (
            <ListResults cards={results} />
          )
        ) : (
          <CircularProgress color='secondary' />
        )}
      </Box>
      <Divider />
      <Box className={classes.content}>
        {dataLoaded && (
          <Pagination
            count={metadata.endingPage}
            color='secondary'
            page={metadata.page + 1}
            onChange={handleChange}
          />
        )}
      </Box>
    </Paper>
  );
}

export default Results;
