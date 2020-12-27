import React, { useContext } from "react";
import styled from "styled-components";
import { StateContext } from "./StateProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import HistoryListStyles from "../styles/HistoryList";

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
const MealHistoryStyles = styled(HistoryListStyles)``;

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
