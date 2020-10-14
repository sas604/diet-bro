import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { parseISO, compareAsc, subDays, format, addDays } from "date-fns";
import "../css/date-picker.scss";
export default function DatePicker() {
  const { dateContext } = useContext(AuthContext);
  const [date, setDate] = dateContext;
  return (
    <div className="date-picker">
      <button
        className="date-picker-btn"
        onClick={() => {
          setDate(format(subDays(parseISO(date), 1), "yyyy-MM-dd"));
        }}
      >
        <strong> &lt;</strong>
      </button>

      <input
        type="date"
        defaultValue={date}
        onChange={(e) => setDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />

      <button
        className="date-picker-btn"
        onClick={() => {
          if (compareAsc(addDays(parseISO(date), 1), new Date()) < 0)
            setDate(format(addDays(parseISO(date), 1), "yyyy-MM-dd"));
        }}
      >
        <strong>&gt;</strong>
      </button>
    </div>
  );
}
