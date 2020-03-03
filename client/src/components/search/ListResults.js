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
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('desc');
  const classes = useStyles();

  const createSortHandler = field => {
    if (field === orderBy) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
      return;
    }
    setOrderBy(field);
  };

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {tableFields.map(field => (
              <TableCell key={field._id} sortDirection={orderBy === field.id ? order : false}>
                <TableSortLabel
                  active={orderBy === field.name}
                  direction={orderBy === field.name ? order : 'asc'}
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
