import React, { useState, useEffect } from 'react';
import { CardPage } from '../../components';
import axios from 'axios';

function SearchResults(props) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('api/cards/', {
        params: { name: props.name }
      })
      .then(function(response) {
        setResults(response);
        setLoading(false);
      });
  }, [props.name]);

  return loading ? <h6>loading...</h6> : <CardPage card={results.data[0]} />;
}

export default SearchResults;
