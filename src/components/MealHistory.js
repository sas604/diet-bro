import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaRegTrashAlt } from 'react-icons/fa';
import HistoryListStyles from '../styles/HistoryList';
import { useSelector } from 'react-redux';

const emoji = [
  '🍔',
  '🍕',
  '🍟',
  '🌭',
  '🥓',
  '🍜',
  '🍛',
  '🥘',
  '🍲',
  '🍝',
  '🥣',
  '🍰',
  '🥗',
  '🥙',
  '🍽',
  '🍴',
  '🥡',
  '🍱',
];

const randomEmoji = () => emoji[Math.floor(Math.random() * emoji.length)];
const MealHistoryStyles = styled(HistoryListStyles)``;

export default function MealHistory() {
  const { loading, entries } = useSelector((state) => state.mealHistory);
  if (loading) return <h1>Loading..</h1>;

  const formatedList = Object.keys(entries).length ? (
    Object.keys(entries).map((element, i) => (
      <li key={element}>
        <span className="icon">{randomEmoji()}</span>
        <span>
          <p>{entries[element].name}</p> <p>{entries[element].energy} Cal</p>
        </span>
        <button title="Delete Entry" type="button" onClick={(f) => f}>
          <FaRegTrashAlt />
        </button>
      </li>
    ))
  ) : (
    <li>No entries for this date</li>
  );

  return (
    <MealHistoryStyles className="history">
      <h3 className="meal-history-heading">Meal History</h3>
      <ul>{formatedList}</ul>
      <div className="meal-history"></div>
    </MealHistoryStyles>
  );
}
