import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import Meal from "./Meal";
export default function MealHistory() {
  const { data, dateContext } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [date] = dateContext;

  const deleteEntry = (e) => {
    setUserData({
      ...currentUserData,
      [date]: Object.keys(currentUserData[date]).reduce(
        (sum, el) =>
          el !== e.target.id
            ? { ...sum, [el]: currentUserData[date][el] }
            : { ...sum },
        {}
      ),
    });
  };
  // list of user meals entries
  return (
    <div className="meal-history">
      <h3>Meal History</h3>
      <ul className="meal-history-list">
        {currentUserData[date]
          ? Object.keys(currentUserData[date]).map((entry) => (
              <Meal
                key={entry}
                name={currentUserData[date][entry].name}
                id={entry}
                onClick={deleteEntry}
              />
            ))
          : "nothing here"}
      </ul>
    </div>
  );
}
