import React, { useState } from 'react';

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
  const [_pageNum, _setPageNum] = useState(0);

  const prevPage = () => {
    if (_pageNum >= 1) {
      _setPageNum(_pageNum - 1);
    }
  };
  const nextPage = () => {
    if ((_pageNum + 1) * itemsPerPage <= _data.length) {
      _setPageNum(_pageNum + 1);
    }
  };
  const sortByField = fieldName => {
    const sortedData = comparingFunc[fieldName]
      ? _data.sort(comparingFunc[fieldName])
      : _data.sort();
    _setData(sortedData);
  };

  const slicedData = _data.slice(
    _pageNum * itemsPerPage,
    (_pageNum + 1) * itemsPerPage
  );
  const metaData = {
    pageNum: _pageNum,
    endingPage: Math.ceil(data.length / itemsPerPage)
  };

  return [slicedData, metaData, prevPage, nextPage, sortByField];
}

export default useDataHandler;
