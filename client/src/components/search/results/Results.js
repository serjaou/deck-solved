import React, { useState } from 'react';
import { Box, Divider, MenuItem, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { ImageResults, ListResults, ResultsToolbar } from '../results';
import $ from 'jquery';

const ITEMS_PER_PAGE_VALUES = [12, 24, 48, 96, 192];

const useStyles = makeStyles({
  container: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem 0' }
});

function Results(props) {
  const [format, setFormat] = useState('images');
  const classes = useStyles();

  const handlePageChange = (event, value) => {
    props.paginatedData.setPage(value - 1);
    $('html,body').scrollTop(0);
  };
  const changeOnItemsPerPage = (event, value) => {
    props.paginatedData.setItemsPerPage(event.target.value);
  };

  return (
    <div>
      <ResultsToolbar
        paginatedData={props.paginatedData}
        format={format}
        setFormat={setFormat}
        tableFields={props.tableFields}
        itemsPerPageValues={ITEMS_PER_PAGE_VALUES}
      />
      <Divider />
      <Box className={classes.container}>
        {format === 'images' ? (
          <ImageResults cards={props.paginatedData.data} />
        ) : (
          <ListResults paginatedData={props.paginatedData} />
        )}
      </Box>
      <Divider />
      <Box className={classes.container}>
        <Pagination
          count={props.paginatedData.finalPage}
          color='secondary'
          page={props.paginatedData.currentPage + 1}
          onChange={handlePageChange}
        />
        <Select value={props.paginatedData.itemsPerPage} onChange={changeOnItemsPerPage}>
          {ITEMS_PER_PAGE_VALUES.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </div>
  );
}

export default Results;
