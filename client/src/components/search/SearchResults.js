import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardPage } from '../../components';
import MultipleResults from './MultipleResults';

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

  return loading ? (
    <h6>loading...</h6>
  ) : results.data.length === 0 ? (
    <h6>No results were found.</h6>
  ) : results.data.length === 1 ? (
    <CardPage card={results.data[0]} />
  ) : (
    <MultipleResults query={props.name} cards={results.data} />
  );
}

export default SearchResults;
