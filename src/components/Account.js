import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import base from "./firebase";
import { format } from "date-fns";
import "../css/settings.scss";

export default function Account() {
  const { data, dateContext, setCurrentUser } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [, setDate] = dateContext;
  return (
    <div className="wrapper bg-pattern ">
      <h1 className="settings-header">Account Settings</h1>
      <form
        className="settings-form"
        onSubmit={(e) => {
          e.preventDefault();

          setUserData({
            ...currentUserData,
            target: Number(e.target.energy.value),
          });
        }}
      >
        <h2>Your daily callories intake target is </h2>
        <span className="calories">{currentUserData.target} Kcal </span>
        <label>
          Set your daily callories intake target
          <input
            onChange={(e) => {
              if (e.target.value > 9999) e.target.value = 9999;
            }}
            name="energy"
            type="number"
            max="9999"
            required
            defaultValue={currentUserData.target}
          />
        </label>
        <button className="btn bg-green">Set</button>
      </form>
      <form
        className="settings-form"
        onSubmit={(e) => {
          e.preventDefault();

          setUserData({
            ...currentUserData,
            targetWeight: Number(e.target.weight.value),
          });
        }}
      >
        <h2>Your target weight is </h2>
        <span className="calories"> {currentUserData.targetWeight} lbs </span>
        <label>
          Set your weight target
          <input
            name="weight"
            type="number"
            required
            defaultValue={currentUserData.targetWeight}
          />
        </label>
        <button className="btn bg-green">Set</button>
      </form>{" "}
      <button
        className=" btn bg-purple sign-out"
        onClick={() =>
          base
            .auth()
            .signOut()
            .then(
              setCurrentUser(null),
              setUserData({}),
              setDate(format(new Date(), "yyyy-MM-dd"), setUserData({})),
              (error) => console.log(error)
            )
        }
      >
        Sign Out
      </button>
    </div>
  );
}
