import DatePicker from './DatePicker';
import CaloriesDisplay from './CaloriesDisplay';
import MealHistory from './MealHistory';
import { useContext } from 'react';
import { AuthContext } from '../Auth';
import { Title } from './Title';
import { LayoutStyles } from '../styles/LayoutStyles';

export default function MealDash() {
  const { currentUser } = useContext(AuthContext);

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
