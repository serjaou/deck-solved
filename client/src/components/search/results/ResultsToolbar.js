import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles(theme => ({
  toggleButtons: {
    backgroundColor: theme.palette.common.white,
    padding: '0.25rem',
    margin: '0.25rem 0',
    minWidth: '6rem'
  },
  filterText: { verticalAlign: 'middle' },
  formatButton: { maxHeight: '2rem' },
  container: { display: 'flex', flexWrap: 'wrap', padding: '0.75rem 0' },
  pagination: { display: 'flex', margin: '0.25rem', padding: '0.25rem' },
  resultsText: { fontSize: '1.125rem', padding: '1.25rem 0 0' },
  select: { padding: '0.5rem', maxHeight: '2.25rem', minWidth: '12rem' },
  selectContainer: { flexGrow: '1', margin: '0.25rem 1.5rem 0.25rem 0' }
}));

function ResultsToolbar(props) {
  const classes = useStyles();

  const handleFormat = (event, format) => {
    props.setFormat(format);
  };
  const handlePageChange = (event, value) => {
    props.dataSource.setPage(value - 1);
  };
  const changeOnItemsPerPage = (event, value) => {
    props.dataSource.setItemsPerPage(event.target.value);
  };
  const handleSelect = (event, value) => {
    props.dataSource.sortByField(event.target.value);
  };

  return (
    <div>
      <Typography className={classes.resultsText} variant='body1'>
        {typeof props.query === 'string'
          ? `Showing results for ${props.query}.`
          : 'Showing results.'}
      </Typography>
      <Box className={classes.container}>
        <ToggleButtonGroup
          className={classes.toggleButtons}
          size='small'
          value={props.format}
          onChange={handleFormat}
          exclusive
        >
          <ToggleButton className={classes.formatButton} value='list'>
            <ListIcon />
          </ToggleButton>
          <ToggleButton className={classes.formatButton} value='images'>
            <AppsIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Box className={classes.selectContainer}>
          {props.format === 'images' && (
            <div>
              <Typography className={classes.filterText} display='inline' variant='subtitle1'>
                <strong>filter by:&nbsp;</strong>
              </Typography>
              <Select
                className={classes.select}
                value={props.dataSource.sortedField}
                onChange={handleSelect}
              >
                {props.tableFields.map(field => (
                  <MenuItem dense key={field._id} value={field.name}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
        </Box>
        <Box className={classes.pagination}>
          <Pagination
            count={props.dataSource.finalPage}
            color='secondary'
            page={props.dataSource.currentPage + 1}
            onChange={handlePageChange}
          />
          <Select value={props.dataSource.itemsPerPage} onChange={changeOnItemsPerPage}>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
            <MenuItem value={96}>96</MenuItem>
          </Select>
        </Box>
      </Box>
    </div>
  );
}

export default ResultsToolbar;
