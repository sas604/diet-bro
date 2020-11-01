import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import DatePicker from "../components/DatePicker";
import MealHistory from "./MealHistory";
import "../css/home.scss";
import { useState } from "react";
import AnimatedNumber from "animated-number-react";
import Loader from "react-loader-spinner";

export default function Home() {
  // get current user from the context
  const { data, dateContext, currentUser } = useContext(AuthContext);
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

  if (!currentUserData)
    return (
      <h1>
        <Loader
          className="loader"
          type="Puff"
          color={"#9163f2"}
          height={100}
          width={100}
          style={{ margin: "10rem auto", textAlign: "center" }}
          timeout={3000} //3 secs
        />{" "}
      </h1>
    );
  return (
    <div className="wrapper bg-pattern home">
      <h1 className="hello">Hello {currentUser.displayName}!</h1>
      <DatePicker />
      <div className="calories-display-tile">
        {callories > 0 ? (
          <p className="entry-msg"> You have consumed </p>
        ) : (
          <p className="entry-msg">No entries for this date</p>
        )}
        <span className="calories">
          {callories && (
            <AnimatedNumber
              value={Math.round(callories)}
              formatValue={(value) => Math.ceil(value)}
              duration="300ms"
            />
          )}
          <strong>Kcal</strong>
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
          <span className="plus">+</span> <p>Add Meal</p>
        </Link>
      </div>

      <MealHistory />
    </div>
  );
}
