import { parseISO, compareAsc, subDays, format, addDays } from 'date-fns';
import CardStyles from '../styles/CardStyles';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setDateAction } from '../features/date/dateSlice';

const PickerStyle = styled(CardStyles)`
  padding: 0;
  display: flex;
  justify-content: center;

  .date-picker-btn {
    touch-action: manipulation;
    margin: 0;
    border: 0;
    background: transparent;
    color: var(--text-color);
    font-size: clamp(1rem, 5vw, 2rem);
    line-height: 2rem;
    cursor: pointer;
    &:disabled {
      color: var(--gray);
    }
    &:hover:not(:disabled) {
      color: var(--purple);
    }
  }
  input {
    border: none;
    line-height: 2rem;
    margin: 0;
    background: transparent;
    font-weight: var(--bold);
  }
`;

export default function DatePicker() {
  const { date } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <PickerStyle>
      <button
        className="date-picker-btn"
        onClick={() =>
          dispatch(
            setDateAction(format(subDays(parseISO(date), 1), 'yyyy-MM-dd'))
          )
        }
      >
        <strong> &lt;</strong>
      </button>

      <input
        type="date"
        value={date}
        onChange={() =>
          dispatch(
            setDateAction(format(subDays(parseISO(date), 1), 'yyyy-MM-dd'))
          )
        }
        max={new Date().toISOString().split('T')[0]}
      />

      <button
        className="date-picker-btn"
        disabled={compareAsc(addDays(parseISO(date), 1), new Date()) >= 0}
        onClick={() => {
          if (compareAsc(addDays(parseISO(date), 1), new Date()) < 0) {
            dispatch(
              setDateAction(format(addDays(parseISO(date), 1), 'yyyy-MM-dd'))
            );
          }
        }}
      >
        <strong>&gt;</strong>
      </button>
    </PickerStyle>
  );
}
