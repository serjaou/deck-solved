import { useHistory } from 'react-router-dom';

function useGoToCardPage() {
  const history = useHistory();

  const goToCardPage = card => {
    history.push({
      pathname: `/cards/${encodeURIComponent(card.name)}`,
      state: { card }
    });
  };

  return goToCardPage;
}

export default useGoToCardPage;
