import React from 'react';
import { useParams } from 'react-router-dom';

function SearchResults() {
  const { query } = useParams();
  return <h1>{query}</h1>;
}

export default SearchResults;
