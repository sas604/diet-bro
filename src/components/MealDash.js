import DatePicker from './DatePicker';
import CaloriesDisplay from './CaloriesDisplay';
import MealHistory from './MealHistory';

import { Title } from './Title';
import { LayoutStyles } from '../styles/LayoutStyles';
import { useSelector } from 'react-redux';

export default function MealDash() {
  const {
    authState: { currentUser },
  } = useSelector((state) => state);

  return (
    <>
      <Title title={`Welcome, ${currentUser.displayName}`} />
      <LayoutStyles>
        <DatePicker />
      </LayoutStyles>
      <LayoutStyles>
        <CaloriesDisplay />
        <MealHistory />
      </LayoutStyles>
    </>
  );
}
