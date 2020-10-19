import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import base from "./firebase";
import { format } from "date-fns";
export default function Account() {
  const { data, dateContext } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [, setDate] = dateContext;
  return (
    <div className="wrapper bg-pattern ">
      <h1>Account Setings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setUserData({
            ...currentUserData,
            target: Number(e.target.energy.value),
          });
        }}
      >
        <h2>Your dayly callories intake target is </h2>
        <span className="calories">{currentUserData.target} Kcal </span>
        <label>
          Set your dayly callories intake target
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
        className=" btn bg-purple "
        onClick={() =>
          base
            .auth()
            .signOut()
            .then(setDate(format(new Date(), "yyyy-MM-dd")), (error) =>
              console.log(error)
            )
        }
      >
        Sign Out
      </button>
    </div>
  );
}
