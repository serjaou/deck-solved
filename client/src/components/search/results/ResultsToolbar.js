import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles({
  toggleButtons: { padding: '0.25rem', margin: '0.25rem 0', minWidth: '6rem' },
  filterText: { verticalAlign: 'middle' },
  formatButton: { maxHeight: '2rem' },
  container: { display: 'flex', flexWrap: 'wrap', padding: '0.75rem 0' },
  pagination: { margin: '0.25rem', padding: '0.25rem' },
  resultsText: { flexGrow: '1', fontSize: '1.125rem', margin: '0.25rem 0', padding: '0.375rem' },
  select: { padding: '0.5rem', maxHeight: '2.25rem', minWidth: '12rem' },
  selectContainer: { margin: '0.25rem 1.5rem 0.25rem 0' }
});

function ResultsToolbar(props) {
  const classes = useStyles();

  const handleFormat = (event, format) => {
    props.setFormat(format);
  };
  const handlePageChange = (event, value) => {
    props.setPage(value - 1);
  };
  const handleSelect = (event, value) => {
    props.sortByField(event.target.value);
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.resultsText} variant='body1'>
        Showing results for <strong>"{props.query}"</strong>.
      </Typography>
      <Box className={classes.selectContainer}>
        {props.format === 'images' && (
          <div>
            <Typography className={classes.filterText} display='inline' variant='subtitle1'>
              <strong>filter by:&nbsp;</strong>
            </Typography>
            <Select className={classes.select} value={props.sortedField} onChange={handleSelect}>
              {props.tableFields.map(field => (
                <MenuItem dense key={field._id} value={field.name}>
                  {field.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      </Box>
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
      <Box className={classes.pagination}>
        <Pagination
          count={props.finalPage}
          color='secondary'
          page={props.page + 1}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default ResultsToolbar;
