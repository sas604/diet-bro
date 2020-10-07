import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { parseISO, compareAsc, subDays, format, addDays } from "date-fns";
export default function DatePicker() {
  const { dateContext } = useContext(AuthContext);
  const [date, setDate] = dateContext;
  return (
    <div>
      <button
        onClick={() => {
          setDate(format(subDays(parseISO(date), 1), "yyyy-MM-dd"));
        }}
      >
        -
      </button>

      <input
        type="date"
        value={date}
        onChange={(e) => console.log()}
        max={new Date().toISOString().split("T")[0]}
      />

      <button
        onClick={() => {
          if (compareAsc(addDays(parseISO(date), 1), new Date()) < 0)
            setDate(format(addDays(parseISO(date), 1), "yyyy-MM-dd"));
        }}
      >
        +
      </button>
    </div>
  );
}
