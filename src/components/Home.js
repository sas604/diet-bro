import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import DatePicker from "../components/DatePicker";
import MealHistory from "./MealHistory";
import "../css/home.scss";
import { useState } from "react";
export default function Home() {
  // get current user from the context
  const { data, dateContext, name } = useContext(AuthContext);
  const [callories, setCallories] = useState(0);
  const [currentUserData, setUserData] = data;
  const [date] = dateContext;
  // set curent date entry in the firebase
  const currentUserDate = currentUserData[date];

  const progress = Math.round((callories / currentUserData.target) * 100);
  // handle entry delete from list
  /*  {TODO }
   * refactor this, to make it more readable
   */

  // calculate consumed callories
  useEffect(() => {
    if (!currentUserDate) {
      setCallories(0);
      return;
    }
    setCallories(
      Object.keys(currentUserDate).reduce(
        (sum, entry) =>
          (currentUserDate[entry].portion * currentUserDate[entry].kcal) / 100 +
            sum || currentUserDate[entry].kcal + sum,

        0
      )
    );
  }, [currentUserDate, setUserData]);

  if (!currentUserData || name === null) return <h1>Loading ... </h1>;
  return (
    <div className="wrapper bg-pattern home">
      <h1>Hello {name}!</h1>
      <DatePicker />
      <span
        className="calories"
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          display: "block",
        }}
      >
        {Math.round(callories)} <strong>Kcal</strong>
      </span>
      {callories > 0 ? (
        <p className="entry-msg"> You have consumed </p>
      ) : (
        <p className="entry-msg">No entries for this date</p>
      )}

      <div className="progress-bar-wrapper">
        <p className="progress-bar-text">{`${progress}% of your daily goal`}</p>
        <div className="progress-bar">
          <span
            style={{
              width: `${progress}%`,
            }}
          ></span>
        </div>
      </div>

      <Link className="add btn" to={ROUTES.ADD_MEAL}>
        <span className="plus">+</span> <p>Add Meal</p>
      </Link>

      <MealHistory />
    </div>
  );
}
