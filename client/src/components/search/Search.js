import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchPage from './SearchPage';
import Results from './results/Results';

function Search() {
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get('name');

  return searchQuery ? <Results query={searchQuery} /> : <SearchPage />;
}

export default Search;
