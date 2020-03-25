import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchPage from './SearchPage';
import Results from './results/Results';
import qs from 'qs';

function SearchRouter() {
  const location = useLocation();
  const queryObj = location.search ? qs.parse(location.search.slice(1)) : null;

  return queryObj ? <Results query={queryObj} /> : <SearchPage />;
}

export default SearchRouter;
