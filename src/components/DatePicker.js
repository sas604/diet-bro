import React, { useContext } from "react";
import { parseISO, compareAsc, subDays, format, addDays } from "date-fns";
import { StateContext } from "./StateProvider";
import CardStyles from "../styles/CardStyles";
import styled from "styled-components";

const PickerStyle = styled(CardStyles)`
  padding: 0;
  display: flex;
  justify-content: center;
  :hover {
    color: var(--purple);
  }
  .date-picker-btn {
    touch-action: manipulation;
    margin: 0;
    border: 0;
    background: transparent;

    font-size: clamp(1rem 5vw 2rem);
    line-height: 2rem;
    cursor: pointer;
    &:hover {
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
  const { state, dispatch } = useContext(StateContext);

  return (
    <PickerStyle>
      <button
        className="date-picker-btn"
        onClick={() => {
          dispatch({
            type: "setDate",
            date: format(subDays(parseISO(state.date), 1), "yyyy-MM-dd"),
          });
        }}
      >
        <strong> &lt;</strong>
      </button>

      <input
        type="date"
        value={state.date}
        onChange={(e) => dispatch({ type: "setDate", date: e.target.value })}
        max={new Date().toISOString().split("T")[0]}
      />

      <button
        className="date-picker-btn"
        onClick={() => {
          if (compareAsc(addDays(parseISO(state.date), 1), new Date()) < 0)
            dispatch({
              type: "setDate",
              date: format(addDays(parseISO(state.date), 1), "yyyy-MM-dd"),
            });
        }}
      >
        <strong>&gt;</strong>
      </button>
    </PickerStyle>
  );
}
