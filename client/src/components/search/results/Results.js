import React, { useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ResultsImages, ResultsTable, ResultsPagination, ResultsToolbar } from '../results';

const useStyles = makeStyles({
  centeredBox: { display: 'flex', justifyContent: 'center', padding: '1rem 0' }
});

function Results(props) {
  const [format, setFormat] = useState('images');
  const classes = useStyles();

  return (
    <div>
      <ResultsToolbar
        paginatedData={props.paginatedData}
        format={format}
        setFormat={setFormat}
        tableFields={props.tableFields}
      />
      <Divider />
      <Box className={classes.centeredBox}>
        {format === 'images' ? (
          <ResultsImages paginatedData={props.paginatedData} />
        ) : (
          <ResultsTable paginatedData={props.paginatedData} tableFields={props.tableFields} />
        )}
      </Box>
      <Divider />
      <Box className={classes.centeredBox}>
        <ResultsPagination paginatedData={props.paginatedData} />
      </Box>
    </div>
  );
}

export default Results;
