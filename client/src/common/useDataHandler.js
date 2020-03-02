import { useState } from 'react';

/**
 * @param {Array} data
 * @param {Number} itemsPerPage
 * @param {Object} comparingFunc
 * useDataHandler.- custom hook that serves paginated data.
 * comparingFunc.- object that contains comparison algorithms to sort data
 * according to a specific field: { <fieldName>: <comparingFunction>, ... }.
 */
function useDataHandler(data, itemsPerPage, comparingFunc = {}) {
  const [_data, _setData] = useState(data);
  const [_page, _setPage] = useState(0);

  const sortByField = fieldName => {
    const sortedData = comparingFunc[fieldName]
      ? _data.sort(comparingFunc[fieldName])
      : _data.sort();
    _setData(sortedData);
  };
  const setPage = page => {
    if (page >= 0 || page <= Math.ceil(data.length / itemsPerPage)) {
      _setPage(page);
    }
  };

  const slicedData = _data.slice(
    _page * itemsPerPage,
    (_page + 1) * itemsPerPage
  );
  const metaData = {
    page: _page,
    endingPage: Math.ceil(data.length / itemsPerPage)
  };

  return [slicedData, metaData, setPage, sortByField];
}

export default useDataHandler;
