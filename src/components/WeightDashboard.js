import WeightDisplay from './WeightDisplay';
import DatePicker from './DatePicker';
import Weighthistory from './WeightHistory';

export default function WeightDashboard() {
  return (
    <>
      <h2 className="head">Weight Tracking</h2>
      <DatePicker />
      <WeightDisplay />
      <Weighthistory />
    </>
  );
}
