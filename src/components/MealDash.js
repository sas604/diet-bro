import DatePicker from './DatePicker';
import CaloriesDisplay from './CaloriesDisplay';
import MealHistory from './MealHistory';
import { useContext } from 'react';
import { AuthContext } from '../Auth';

export default function MealDash() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <h2 className="head">Welcome, {currentUser.displayName}</h2>
      <DatePicker />
      <CaloriesDisplay />
      <MealHistory />
    </>
  );
}
