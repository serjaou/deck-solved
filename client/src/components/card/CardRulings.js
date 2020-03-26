import React, { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  divider: { marginLeft: '1rem' },
  container: { backgroundColor: theme.palette.grey.lighter },
  rulingComment: { wordBreak: 'break-word' }
}));

function CardRulings(props) {
  const classes = useStyles();
  const [rulingData, setRulingData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('/api/rulings/', {
        params: { oracle_id: props.oracle_id }
      })
      .then(
        ruling => {
          setRulingData(ruling.data);
          setDataLoaded(true);
        },
        error => console.log(error)
      );
    return () => {
      setRulingData([]);
      setDataLoaded(false);
    };
  }, [props.oracle_id]);

  return (
    dataLoaded &&
    rulingData.length > 0 && (
      <Paper className={classes.container} elevation={2}>
        <List>
          <ListItem dense>
            <Typography variant='h6'>Rulings:</Typography>
          </ListItem>
          {rulingData.map(ruling => (
            <div key={ruling._id}>
              <Divider className={classes.divider} variant='inset' component='li' />
              <ListItem dense alignItems='flex-start'>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant='subtitle2'>
                        <em>{ruling.published_at}</em>
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        className={classes.rulingComment}
                        component='span'
                        variant='body2'
                      >
                        {ruling.source.toUpperCase()}
                        <em>{` — ${ruling.comment}`}</em>
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ))}
        </List>
      </Paper>
    )
  );
}

export default CardRulings;
