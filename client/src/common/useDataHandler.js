import { useState } from 'react';

/**
 * @param {Array} data
 * @param {Number} itemsPerPage
 * @param {Object} sortingFunctions
 * useDataHandler.- custom hook that serves paginated data.
 * sortingFunctions.- object that contains comparison algorithms to sort data
 * according to a specific field: { <fieldName>: <sortingFunction>, ... }.
 */
function useDataHandler(data = [], sortingFunctions = {}, itemsPerPage = 48) {
  const [_data, _setData] = useState(data);
  const [_page, _setPage] = useState(0);
  const [_itemsPerPage, _setItemsPerPage] = useState(itemsPerPage);
  const [_sortedField, _setSortedField] = useState('');
  const _finalPage = Math.ceil(_data.length / _itemsPerPage);

  const setData = data => {
    if (Array.isArray(data) && data.length > 0) {
      _setData(data);
    }
  };
  const setPage = page => {
    if (!isNaN(page) && page >= 0 && page < _finalPage) {
      _setPage(page);
    }
  };
  const setItemsPerPage = itemsPerPage => {
    if (!isNaN(itemsPerPage) && itemsPerPage > 0) {
      _setItemsPerPage(itemsPerPage);
      _setPage(0);
    }
  };
  const sortByField = field => {
    if (field === _sortedField) {
      _setData([..._data.reverse()]);
    } else if (sortingFunctions[field]) {
      _setData(_data.sort(sortingFunctions[field]));
      _setSortedField(field);
    }
  };

  return {
    finalPage: _finalPage,
    data: _data.slice(_page * _itemsPerPage, (_page + 1) * _itemsPerPage),
    itemsPerPage: _itemsPerPage,
    currentPage: _page,
    sortedField: _sortedField,
    setData,
    setPage,
    setItemsPerPage,
    sortByField
  };
}

export default useDataHandler;
