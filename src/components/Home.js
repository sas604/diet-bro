import React, { useContext, useEffect } from "react";
import base from "./firebase";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import DatePicker from "../components/DatePicker";
import MealHistory from "./MealHistory";
import "../css/home.scss";
export default function Home() {
  // get current user from the context
  const { currentUser, data, dateContext, name } = useContext(AuthContext);

  const [currentUserData, setUserData] = data;
  const [date] = dateContext;
  // set curent date entry in the firebase
  const currentUserDate = currentUserData[date];

  const progress = Math.round(
    (currentUserData.calories / currentUserData.target) * 100
  );
  // handle entry delete from list
  /*  {TODO }
   * refactor this, to make it more readable
   */

  // calculate consumed callories
  useEffect(() => {
    if (currentUserDate) {
      const callorie = Object.keys(currentUserDate).reduce(
        (sum, entry) =>
          (currentUserDate[entry].portion * currentUserDate[entry].kcal) / 100 +
            sum || currentUserDate[entry].kcal + sum,

        0
      );

      setUserData((currentUserData) => ({
        ...currentUserData,
        calories: callorie,
      }));
    } else
      setUserData((currentUserData) => ({ ...currentUserData, calories: 0 }));
  }, [currentUserDate, setUserData]);
  useEffect(() => {}, [currentUser]);

  if (!currentUserData || name === null) return <h1>Loading ... </h1>;
  return (
    <div className="wrapper bg-pattern home">
      <h1>
        Hello <strong>{name}</strong>!
      </h1>
      <DatePicker />
      {currentUserData.calories > 0 ? (
        <h2> You have consumed </h2>
      ) : (
        <h2>No entries for this date</h2>
      )}
      <span
        className="calories"
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          display: "block",
        }}
      >
        {Math.round(currentUserData.calories)} <strong>Kcal</strong>
      </span>
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
        Add Meal
      </Link>
      <br />
      <MealHistory />
      <button
        onClick={() =>
          base
            .auth()
            .signOut()
            .then(
              () => console.log(),
              (error) => console.log(error)
            )
        }
      >
        Sign Out
      </button>
    </div>
  );
}
