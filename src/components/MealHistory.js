import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HistoryList from './HistoryList';
import CardStyles from '../styles/CardStyles';

const MealHistoryStyles = styled(CardStyles)`
  * {
    margin: 0;
  }
  align-self: start;
  h3 {
    margin-bottom: 1em;
  }
  ul {
    max-height: 360px;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }
`;

export default function MealHistory() {
  const { loading, entries } = useSelector((state) => state.mealHistory);
  if (loading) return <h1>Loading...</h1>;

  return (
    <MealHistoryStyles className="history">
      <h3 className="meal-history-heading">Meal History</h3>
      <HistoryList list={Object.entries(entries)}></HistoryList>
      <div className="meal-history"></div>
    </MealHistoryStyles>
  );
}
