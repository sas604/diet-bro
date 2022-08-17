import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { FaRegTrashAlt, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HistoryListStyles from '../styles/HistoryList';
import { weightEntryFirebase } from './firebase';

const WeightHistoryStyles = styled(HistoryListStyles)`
  span {
    margin-right: 1rem;
  }
  .number {
    color: var(--dark-purple);
  }
`;
export default function WeightHistory() {
  const state = useSelector((state) => state);
  const deleteEntry = (entry) => {
    weightEntryFirebase(entry);
  };

  const weightHistoryList = Object.keys(state.weight).length ? (
    Object.keys(state.weight)
      .reverse()
      .map((entry, i) => {
        const reverseArray = Object.keys(state.weight).reverse();
        const trend = (entry) => {
          if (i < reverseArray.length - 1) {
            if (state.weight[entry] - state.weight[reverseArray[i + 1]] === 0)
              return <span>No change </span>;
            if (state.weight[entry] - state.weight[reverseArray[i + 1]] > 0) {
              return (
                <span>
                  <FaSortUp style={{ color: 'var(--green)' }} />
                  <span>
                    {state.weight[entry] - state.weight[reverseArray[i + 1]]}
                    Lbs
                  </span>
                </span>
              );
            } else
              return (
                <span>
                  <FaSortDown style={{ color: 'var(--red)' }} />
                  <span>
                    {Math.abs(
                      state.weight[entry] - state.weight[reverseArray[i + 1]]
                    )}
                    Lbs
                  </span>
                </span>
              );
          }
        };

        return (
          <li key={entry}>
            <span className="icon">📅</span>
            <span>
              <p>{format(parseISO(entry), ' MMM d  yyyy')}</p>
              <p className="number">{state.weight[entry]}Lbs</p>
            </span>
            <span>{trend(entry)}</span>
            <button onClick={() => deleteEntry(entry)}>
              <FaRegTrashAlt />
            </button>
          </li>
        );
      })
  ) : (
    <li>No weight entries</li>
  );

  return (
    <WeightHistoryStyles className="history">
      <h3>Weight History</h3>
      <ul>{weightHistoryList}</ul>
    </WeightHistoryStyles>
  );
}
