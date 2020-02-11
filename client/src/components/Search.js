import React from 'react';

function Search() {
  return (
    <div className='search'>
      <div className='input-block'>
        <input type='search' name='searcher' />
        <button type='submit'>Search</button>
      </div>
    </div>
  );
}

export default Search;
