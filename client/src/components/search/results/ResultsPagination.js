import React from 'react';
import { Box, MenuItem, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';

const useStyles = makeStyles({
  container: { display: 'flex', flexWrap: 'wrap', padding: '0.5rem 0' }
});

const ITEMS_PER_PAGE_VALUES = [12, 24, 48, 96, 192];

function ResultsPagination(props) {
  const classes = useStyles();

  const changePage = (event, value) => {
    props.paginatedData.setPage(value - 1);
    // scroll to top on pace change.
    $('html,body').scrollTop(0);
  };

  return (
    <Box className={classes.container}>
      <Pagination
        count={props.paginatedData.finalPage}
        color='secondary'
        page={props.paginatedData.currentPage + 1}
        onChange={changePage}
      />
      <Select
        value={props.paginatedData.itemsPerPage}
        onChange={event => props.paginatedData.setItemsPerPage(event.target.value)}
      >
        {ITEMS_PER_PAGE_VALUES.map(value => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default ResultsPagination;
