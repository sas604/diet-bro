import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth";
import { parseISO, compareAsc, subDays, format, addDays } from "date-fns";
import "../css/date-picker.scss";
import { StateContext } from "./StateProvider";
export default function DatePicker() {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div className="date-picker">
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
    </div>
  );
}
