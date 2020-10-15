import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import base from "./firebase";
import { format } from "date-fns";
export default function Account() {
  const { data, dateContext } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [, setDate] = dateContext;
  return (
    <div>
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
        <span>{currentUserData.target} Kcal </span> <br />
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
        <button>Set</button>
      </form>

      <br />
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
        <span>{currentUserData.targetWeight} lbs </span> <br />
        <label>
          Set your weight target
          <input
            name="weight"
            type="number"
            required
            defaultValue={currentUserData.targetWeight}
          />
        </label>
        <button>Set</button>
      </form>
      <button
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
