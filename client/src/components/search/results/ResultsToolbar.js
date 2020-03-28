import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import { ResultsPagination } from '../results';

const useStyles = makeStyles({
  filter: { padding: '0.5rem', maxHeight: '2.25rem', minWidth: '12rem' },
  filterContainer: { flexGrow: '1', padding: '0.25rem 1rem' },
  filterLabel: { verticalAlign: 'middle' },
  formatButton: { height: '2rem' },
  container: { display: 'flex', flexWrap: 'wrap', padding: '0.5rem 0' },
  toggleButtons: { backgroundColor: 'inherit', padding: '0.5rem 0' }
});

function ResultsToolbar(props) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <ToggleButtonGroup
        className={classes.toggleButtons}
        size='small'
        value={props.format}
        onChange={(event, value) => props.setFormat(value)}
        exclusive
      >
        <ToggleButton className={classes.formatButton} value='list'>
          <ListIcon />
        </ToggleButton>
        <ToggleButton className={classes.formatButton} value='images'>
          <AppsIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Box className={classes.filterContainer}>
        {props.format === 'images' && (
          <div>
            <Typography className={classes.filterLabel} display='inline' variant='subtitle1'>
              <strong>filter by:&nbsp;</strong>
            </Typography>
            <Select
              className={classes.filter}
              value={props.paginatedData.sortedField}
              onChange={event => props.paginatedData.sortByField(event.target.value)}
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
      <ResultsPagination paginatedData={props.paginatedData} />
    </Box>
  );
}

export default ResultsToolbar;
