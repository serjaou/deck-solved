import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useSubmitSearch(initValue = '') {
  const [value, setValue] = useState(initValue);
  const history = useHistory();

  const handleSubmit = () => {
    history.push({
      pathname: '/search',
      search: `name=${value}`
    });
  };

  return [value, setValue, handleSubmit];
}

export default useSubmitSearch;
