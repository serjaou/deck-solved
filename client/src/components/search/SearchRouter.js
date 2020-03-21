import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchPage from './SearchPage';
import Results from './results/Results';

function SearchRouter() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('name');

  return searchQuery ? <Results query={searchQuery} /> : <SearchPage />;
}

export default SearchRouter;
