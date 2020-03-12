import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Divider, MenuItem, Paper, Select } from '@material-ui/core';
import { Typography } from '@material-ui/core';
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
  const dataSource = useDataHandler(undefined, sortingFunctions);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [format, setFormat] = useState('images');
  const classes = useStyles();

  useEffect(() => {
    axios.get('api/cards/', { params: { name: props.query } }).then(function(response) {
      dataSource.setData(response.data);
      setDataLoaded(true);
    });
    return () => {
      dataSource.setData([]);
      setDataLoaded(false);
      setFormat('images');
    };
    // eslint-disable-next-line
  }, [props.query]);

  const handlePageChange = (event, value) => {
    dataSource.setPage(value - 1);
    $('html,body').scrollTop(0);
  };
  const changeOnItemsPerPage = (event, value) => {
    dataSource.setItemsPerPage(event.target.value);
  };

  return dataLoaded && dataSource.data.length === 1 ? (
    <CardPage card={dataSource.data[0]} />
  ) : dataLoaded ? (
    <Paper className={classes.page} elevation={2}>
      <ResultsToolbar
        dataSource={dataSource}
        format={format}
        setFormat={setFormat}
        tableFields={tableFields}
        query={props.query}
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
