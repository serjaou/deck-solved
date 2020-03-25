import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Divider, MenuItem, Paper, Select } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { ImageResults, ListResults, ResultsToolbar } from '../results';
import { useDataHandler } from '../../../common';
import tableFields from './_tableFields';
import axios from 'axios';
import $ from 'jquery';

const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0.75rem 0'
  },
  page: { padding: '0 2rem', backgroundColor: theme.palette.common.white },
  progress: { margin: '14rem 0 20rem' },
  resultsText: { fontSize: '1.125rem', padding: '1.25rem 0' }
}));

const sortingFunctions = Object.assign(
  ...tableFields.map(field => ({ [field.name]: field.compare.bind(field) }))
);

function Results(props) {
  const dataSource = useDataHandler(undefined, sortingFunctions);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [format, setFormat] = useState('images');
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
          dataSource.setData(cards.data);
          setDataLoaded(true);
        }
      },
      error => console.log(error)
    );
    return () => {
      dataSource.setData([]);
      setDataLoaded(false);
      setFormat('images');
    };
  }, [props.query]);

  const handlePageChange = (event, value) => {
    dataSource.setPage(value - 1);
    $('html,body').scrollTop(0);
  };
  const changeOnItemsPerPage = (event, value) => {
    dataSource.setItemsPerPage(event.target.value);
  };

  return dataLoaded ? (
    dataSource.data.length > 0 ? (
      <Paper className={classes.page} elevation={2}>
        <Typography className={classes.resultsText} variant='body1'>
          {props.query.name ? `Showing results for "${props.query.name}".` : 'Showing results.'}
        </Typography>
        <ResultsToolbar
          dataSource={dataSource}
          format={format}
          setFormat={setFormat}
          tableFields={tableFields}
        />
        <Divider />
        <Box className={classes.centeredContainer}>
          {format === 'images' ? (
            <ImageResults cards={dataSource.data} />
          ) : (
            <ListResults dataSource={dataSource} />
          )}
        </Box>
        <Divider />
        <Box className={classes.centeredContainer}>
          <Pagination
            count={dataSource.finalPage}
            color='secondary'
            page={dataSource.currentPage + 1}
            onChange={handlePageChange}
          />
          <Select value={dataSource.itemsPerPage} onChange={changeOnItemsPerPage}>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
            <MenuItem value={96}>96</MenuItem>
          </Select>
        </Box>
      </Paper>
    ) : (
      <Paper className={classes.page} elevation={2}>
        <Typography className={classes.resultsText} variant='subtitle1'>
          {props.query.name
            ? `No results were found for ${props.query.name}.`
            : 'No results were found.'}
        </Typography>
      </Paper>
    )
  ) : (
    <Paper className={classes.page} elevation={2}>
      <Typography className={classes.resultsText} variant='subtitle1'>
        {props.query.name ? `Searching for ${props.query.name}.` : 'Searching...'}
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
