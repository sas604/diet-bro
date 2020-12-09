import React, { useContext } from "react";
import styled from "styled-components";
import { StateContext } from "./StateProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import CardStyles from "../styles/CardStyles";

const emoji = [
  "🍔",
  "🍕",
  "🍟",
  "🌭",
  "🥓",
  "🍜",
  "🍛",
  "🥘",
  "🍲",
  "🍝",
  "🥣",
  "🍰",
  "🥗",
  "🥙",
  "🍽",
  "🍴",
  "🥡",
  "🍱",
];

const randomEmoji = () => emoji[Math.floor(Math.random() * emoji.length)];
console.log(randomEmoji());
const MealHistoryStyles = styled(CardStyles)`
  border-radius: 5px;
  box-shadow: var(--light-shadow);
  padding: 2rem 1.5rem;
  * {
    margin: 0;
  }

  h3 {
    margin-bottom: 1em;
  }
  ul {
    max-height: 480px;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }

  li {
    display: flex;
    font-weight: 600;
    padding: 1em 0;
    align-items: center;
  }

  li + li {
    border-top: 3px solid var(--gray);
  }

  p + p {
    font-size: 1.3rem;
    color: var(--dark-purple);
    min-width: 8ch;
  }
  .number {
    font-size: 1.2em;
  }
  .icon {
    margin-right: 1rem;
  }
  button {
    margin-left: auto;
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    font-size: 1.3rem;
    font-weight: 600;
    &:hover,
    &:focus {
      color: var(--red);
      transform: scale(1.05);
      cursor: pointer;
    }
  }
`;

export default function MealHistory() {
  const { state, dispatch } = useContext(StateContext);
  if (state.loading) return <h1>Loading..</h1>;

  // list of user meals entries
  const deleteEntry = (index) => {
    const mealHistory = Object.keys(state.mealHistory[state.date]).reduce(
      (acc, entry) => {
        if (index !== entry) {
          return {
            ...acc,
            [entry]: state.mealHistory[state.date][entry],
          };
        }
        return { ...acc };
      },
      {}
    );
    dispatch({ type: "del", state: mealHistory });
  };

  const formatedList =
    state.mealHistory[state.date] &&
    Object.keys(state.mealHistory[state.date]).length &&
    Object.keys(state.mealHistory[state.date]).map((element, i) => (
      <li key={element}>
        <span className="icon">{randomEmoji()}</span>
        <span>
          <p>{state.mealHistory[state.date][element].name}</p>{" "}
          <p>{state.mealHistory[state.date][element].energy} Cal</p>
        </span>
        <button
          title="Delete Entry"
          type="button"
          onClick={() => deleteEntry(element)}
        >
          <FaRegTrashAlt />
        </button>
      </li>
    ));
  return (
    <MealHistoryStyles className="history">
      <h3 className="meal-history-heading">Meal History</h3>
      <ul>{formatedList || <li>No entries for this date</li>}</ul>
      <div className="meal-history"></div>
    </MealHistoryStyles>
  );
}
