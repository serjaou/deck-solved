import React, { useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ResultsImages, ResultsList, ResultsPagination, ResultsToolbar } from '../results';

const useStyles = makeStyles({
  centeredBox: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem 0' }
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
          <ResultsList paginatedData={props.paginatedData} />
        )}
        <Divider />
        <div>
          <ResultsPagination paginatedData={props.paginatedData} />
        </div>
      </Box>
    </div>
  );
}

export default Results;
