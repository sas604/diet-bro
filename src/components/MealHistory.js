import React, { useContext } from "react";
import { AuthContext } from "../Auth";
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
    <section className="meal-history">
      <h3>Meal History</h3>
      <ul className="meal-history-list">
        {currentUserData[date]
          ? Object.keys(currentUserData[date]).map((entry) => (
              <li key={entry} className="meal-history-list-item">
                <h4>{currentUserData[date][entry].name}</h4>
                <button id={entry} onClick={deleteEntry}>
                  Delete
                </button>
              </li>
            ))
          : "nothing here"}
      </ul>
    </section>
  );
}
