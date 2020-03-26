import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { TableRow, TableSortLabel, Tooltip, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { CardImage, CardText } from '../../card';
import { tableFields } from '../../../common';

const useStyles = makeStyles(theme => ({
  cell: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  container: { backgroundColor: theme.palette.common.white },
  table: { tableLayout: 'fixed' },
  tableHeader: { backgroundColor: theme.palette.grey.lighter }
}));

const StyledTooltip = withStyles({
  tooltip: { backgroundColor: 'transparent', maxWidth: 270 }
})(Tooltip);

const StyledTableRow = withStyles(theme => ({
  root: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: '#FFFFFF'
    }
  }
}))(TableRow);

const CardImageOnHover = React.forwardRef(function(props, ref) {
  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }}
      {...props}
      ref={ref}
    >
      {props.card.name}
    </div>
  );
});

function ResultsList(props) {
  const [order, setOrder] = useState('desc');
  const history = useHistory();
  const classes = useStyles();

  const createSortHandler = field => {
    if (field === props.paginatedData.sortedField) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    }
    props.paginatedData.sortByField(field);
    props.paginatedData.setPage(0);
  };
  const handleClick = name => {
    history.push({
      pathname: `/cards/${encodeURIComponent(name)}`
    });
  };

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table size='small' className={classes.table}>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            {tableFields.map(field => (
              <TableCell
                className={makeStyles({ cell: { width: props => props.cellWidth } })(field).cell}
                key={field._id}
                sortDirection={field.name === props.paginatedData.sortedField ? order : false}
              >
                <TableSortLabel
                  active={props.paginatedData.sortedField === field.name}
                  direction={props.paginatedData.sortedField === field.name ? order : 'asc'}
                  onClick={() => createSortHandler(field.name)}
                >
                  {field.label.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.paginatedData.data.map(card => (
            <StyledTableRow key={card.id} onClick={() => handleClick(card.name)}>
              <TableCell>
                <StyledTooltip
                  className={classes.tooltip}
                  placement='right'
                  TransitionProps={{ timeout: { enter: 0, exit: 0 } }}
                  title={<CardImage card={card} variant='normal' />}
                >
                  <CardImageOnHover card={card} />
                </StyledTooltip>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultsList;
