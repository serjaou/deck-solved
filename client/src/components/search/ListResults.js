import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { TableRow, TableSortLabel, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import tableFields from './_tableFields';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.gray.lighter
  }
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white
    }
  }
}))(TableRow);

function ListResults(props) {
  const [order, setOrder] = useState('desc');
  const classes = useStyles();

  const createSortHandler = field => {
    props.sortByField(field);
    props.setPage(0);
    if (field === props.sortingField) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    }
  };

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {tableFields.map(field => (
              <TableCell key={field._id} sortDirection={field.name === props.sortingField ? order : false}>
                <TableSortLabel
                  active={props.sortingField === field.name}
                  direction={props.sortingField === field.name ? order : 'asc'}
                  onClick={() => createSortHandler(field.name)}
                >
                  {field.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards.map(card => (
            <StyledTableRow key={card.id}>
              <TableCell>{card.name}</TableCell>
              <TableCell>{card.mana_cost}</TableCell>
              <TableCell>{card.type_line}</TableCell>
              <TableCell>{card.rarity}</TableCell>
              <TableCell>{card.power && card.power + '/' + card.toughness}</TableCell>
              <TableCell>{card.artist}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListResults;
