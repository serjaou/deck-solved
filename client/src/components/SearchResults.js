import React, { useState, useEffect } from 'react';
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

  return <h6>{loading ? 'loading...' : JSON.stringify(results)}</h6>;
}

export default SearchResults;
