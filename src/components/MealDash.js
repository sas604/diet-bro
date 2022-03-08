import DatePicker from './DatePicker';
import CaloriesDisplay from './CaloriesDisplay';
import MealHistory from './MealHistory';

export default function MealDash({ currentUser = 'test' }) {
  return (
    <>
      <h2 className="head">Welcome, {currentUser.displayName}</h2>
      <DatePicker />
      <CaloriesDisplay />
      <MealHistory />
    </>
  );
}
