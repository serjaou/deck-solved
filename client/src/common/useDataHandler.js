import { useState } from 'react';

/**
 * @param {Array} data
 * @param {Number} itemsPerPage
 * @param {Object} comparingFunc
 * useDataHandler.- custom hook that serves paginated data.
 * comparingFunc.- object that contains comparison algorithms to sort data
 * according to a specific field: { <fieldName>: <comparingFunction>, ... }.
 */
function useDataHandler(itemsPerPage = 25, data = [], comparingFunc = {}) {
  const [_data, _setData] = useState(data);
  const [_page, _setPage] = useState(0);

  const setData = data => {
    if (typeof data === 'object' && data.length > 0) {
      _setData(data);
    }
  };
  const setPage = page => {
    if (page >= 0 || page <= Math.ceil(data.length / itemsPerPage)) {
      _setPage(page);
    }
  };
  const sortByField = fieldName => {
    const sortedData = comparingFunc[fieldName] ? _data.sort(comparingFunc[fieldName]) : _data.sort();
    _setData(sortedData);
  };

  const slicedData = _data.length ? _data.slice(_page * itemsPerPage, (_page + 1) * itemsPerPage) : [];
  const metaData = {
    page: _page,
    endingPage: _data.length ? Math.ceil(_data.length / itemsPerPage) : 1
  };
  return [slicedData, metaData, setData, setPage, sortByField];
}

export default useDataHandler;
