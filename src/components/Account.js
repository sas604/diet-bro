import React, { useContext } from "react";
import { AuthContext } from "../Auth";

export default function Account() {
  const { data } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  return (
    <div>
      <h1>Account Setings</h1>

      <form>
        <h2>Your dayly callories intake target is </h2>
        <span>{currentUserData.target} Kcal </span> <br />
        <label>
          Set your dayly callories intake target
          <input
            onChange={(e) => {
              if (e.target.value > 9999) e.target.value = 9999;
            }}
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
          console.log();
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
    </div>
  );
}
