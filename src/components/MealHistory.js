import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import Meal from "./Meal";
import "../css/mealHistory.scss";
import { Link } from "react-router-dom";
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
        {currentUserData[date] ? (
          Object.keys(currentUserData[date]).map((entry) => (
            <Meal
              key={entry}
              name={currentUserData[date][entry].name}
              id={entry}
              calories={
                (currentUserData[date][entry].kcal / 100) *
                  currentUserData[date][entry].portion ||
                currentUserData[date][entry].kcal
              }
              onClick={deleteEntry}
            />
          ))
        ) : (
          <h4>
            {" "}
            No entries for this date,{" "}
            <Link to={"/add-meal"}>try to add a meal </Link>
          </h4>
        )}
      </ul>
    </div>
  );
}
