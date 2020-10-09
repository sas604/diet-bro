import React, { useContext, useEffect } from "react";
import base from "./firebase";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import DatePicker from "../components/DatePicker";
import MealHistory from "./MealHistory";

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
      console.log("rerender");
      const callorie = Object.keys(currentUserDate).reduce((sum, entry) => {
        return (
          sum +
            (currentUserDate[entry].portion * currentUserDate[entry].kcal) /
              100 || currentUserDate[entry].kcal
        );
      }, 0);

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
    <div>
      <h1>{`Hello ${name}`} </h1>
      <DatePicker />

      <h2>Today you have consumed </h2>
      <span
        className="calories"
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          display: "block",
        }}
      >
        {Math.round(currentUserData.calories) + "Kcal"}
      </span>
      <div style={{ display: "flex", height: 30, position: "relative" }}>
        <span
          style={{ textAlign: "center", width: "100%", position: "absolute" }}
        >{`${progress}% of your daily goal`}</span>
        <span
          style={{
            width: `${progress}%`,
            backgroundColor: "red",
          }}
        ></span>
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
