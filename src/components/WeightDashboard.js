import WeightDisplay from './WeightDisplay';
import DatePicker from './DatePicker';
import Weighthistory from './WeightHistory';
import { Title } from './Title';
import { LayoutStyles } from '../styles/LayoutStyles';

export default function WeightDashboard() {
  return (
    <>
      <Title title="Weight Tracking" />
      <DatePicker />
      <LayoutStyles>
        <WeightDisplay />
        <Weighthistory />
      </LayoutStyles>
    </>
  );
}
