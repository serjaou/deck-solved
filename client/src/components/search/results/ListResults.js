import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { TableRow, TableSortLabel, Tooltip, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { CardImage } from '../../../components';
import tableFields from './_tableFields';

const useStyles = makeStyles(theme => ({
  container: { backgroundColor: theme.palette.gray.lighter },
  table: { tableLayout: 'fixed' }
}));

const StyledTooltip = withStyles({
  tooltip: { backgroundColor: 'transparent', maxWidth: 270 }
})(Tooltip);

const StyledTableRow = withStyles(theme => ({
  root: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white
    }
  }
}))(TableRow);

const CardImageOnHover = React.forwardRef(function(props, ref) {
  return (
    <div style={{ display: 'inline-block' }} {...props} ref={ref}>
      {props.card.name}
    </div>
  );
});

function ListResults(props) {
  const [order, setOrder] = useState('desc');
  const history = useHistory();
  const classes = useStyles();

  const createSortHandler = field => {
    if (field === props.sortedField) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    }
    props.sortByField(field);
    props.setPage(0);
  };
  const handleClick = name => {
    history.push({
      pathname: `/cards/${name}`
    });
  };

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table size='small' className={classes.table}>
        <TableHead>
          <TableRow>
            {tableFields.map(field => (
              <TableCell
                className={makeStyles({ cell: { width: props => props.cellWidth } })(field).cell}
                key={field._id}
                sortDirection={field.name === props.sortedField ? order : false}
              >
                <TableSortLabel
                  active={props.sortedField === field.name}
                  direction={props.sortedField === field.name ? order : 'asc'}
                  onClick={() => createSortHandler(field.name)}
                >
                  {field.label.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards.map(card => (
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
