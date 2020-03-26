import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useSubmitSearch(initValue = '') {
  const [value, setValue] = useState(initValue);
  const history = useHistory();

  const submitSearch = () => {
    history.push({
      pathname: '/search',
      search: `name=${value}`
    });
    setValue('');
  };

  return [value, setValue, submitSearch];
}

export default useSubmitSearch;
