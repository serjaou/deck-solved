import React from 'react';
import { useLocation } from 'react-router-dom';
import SimpleSearch from './SimpleSearch';
import SearchResults from './SearchResults';

function Search() {
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get('name');

  return searchQuery ? <SearchResults name={searchQuery} /> : <SimpleSearch />;
}

export default Search;
