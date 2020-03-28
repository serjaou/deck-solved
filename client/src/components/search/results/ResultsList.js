import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { TableRow, TableSortLabel, Tooltip, Link, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CardImage, CardText } from '../../card';

const useStyles = makeStyles(theme => ({
  cell: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  table: { tableLayout: 'fixed' },
  tableContainer: { backgroundColor: theme.palette.common.white },
  tableHeader: { backgroundColor: theme.palette.grey.lighter }
}));

const RangedColorTableRow = withStyles({
  root: { '&:nth-of-type(odd)': { backgroundColor: '#FFFFFF' } }
})(TableRow);

const CardImageTooltip = withStyles({
  tooltip: { backgroundColor: 'transparent', maxWidth: 270 }
})(Tooltip);

function ResultsList(props) {
  const [sortingOrder, setSortingOrder] = useState('desc');
  const classes = useStyles();

  const sortTable = sortingField => {
    if (sortingField === props.paginatedData.sortedField) {
      // if the field is already sorted, reverse the order.
      setSortingOrder(sortingOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortingOrder('asc');
    }
    props.paginatedData.sortByField(sortingField);
    props.paginatedData.setPage(0);
  };

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size='small' className={classes.table}>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            {props.tableFields.map(field => (
              <TableCell key={field._id} style={{ width: field.cellWidth }}>
                <TableSortLabel
                  active={props.paginatedData.sortedField === field.name}
                  direction={props.paginatedData.sortedField === field.name ? sortingOrder : 'asc'}
                  onClick={() => sortTable(field.name)}
                >
                  {field.label.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.paginatedData.data.map(card => (
            <RangedColorTableRow key={card.id}>
              <TableCell className={classes.cell}>
                <CardImageTooltip
                  placement='right'
                  TransitionProps={{ timeout: { enter: 0, exit: 0 } }}
                  title={<CardImage card={card} variant='normal' />}
                >
                  <Link href={`/cards/${encodeURIComponent(card.name)}`} underline='none'>
                    {card.name}
                  </Link>
                </CardImageTooltip>
              </TableCell>
              <TableCell className={classes.cell}>
                {card.mana_cost && <CardText text={card.mana_cost} />}
              </TableCell>
              <TableCell className={classes.cell}>{card.type_line}</TableCell>
              <TableCell className={classes.cell}>{card.rarity}</TableCell>
              <TableCell className={classes.cell}>
                {card.power && card.power + '/' + card.toughness}
              </TableCell>
              <TableCell className={classes.cell}>{card.artist}</TableCell>
            </RangedColorTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultsList;
