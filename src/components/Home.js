import React, { useContext, useEffect } from "react";
import base from "./firebase";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { parseISO, compareAsc, subDays, format, addDays } from "date-fns";

export default function Home() {
  // get current user from the context
  const { currentUser, data, dateContext } = useContext(AuthContext);

  const [currentUserData, setUserData] = data;
  const [date, setDate] = dateContext;

  const currentUserDate = currentUserData[date];

  const progress = Math.round(
    (currentUserData.calories / currentUserData.target) * 100
  );
  // handle entry delete from list
  /*  {TODO }
   * refactor this, to make it more readable
   */
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
  const list = currentUserData[date]
    ? Object.keys(currentUserData[date]).map((entry) => (
        <li key={entry}>
          <h4>{currentUserData[date][entry].name}</h4>
          <button id={entry} onClick={deleteEntry}>
            Delete
          </button>
        </li>
      ))
    : "nothing here";

  // calculate consumed callories
  useEffect(() => {
    if (currentUserDate) {
      const callorie = Object.keys(currentUserDate).reduce((sum, entry) => {
        return (
          sum +
          currentUserDate[entry].portion * (currentUserDate[entry].kcal / 100)
        );
      }, 0);

      setUserData((currentUserData) => ({
        ...currentUserData,
        calories: callorie,
      }));
    } else
      setUserData((currentUserData) => ({ ...currentUserData, calories: 0 }));
  }, [currentUserDate, setUserData]);

  if (!currentUserData) return <h1>Loading ... </h1>;
  return (
    <div>
      <h1>{`Hello ${currentUser.displayName}`} </h1>
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
      <ul>{list}</ul>
      <button onClick={() => base.auth().signOut()}>Sign Out </button>
    </div>
  );
}
