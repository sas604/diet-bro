import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import DatePicker from "./DatePicker";
import ProgressBar from "./ProgressBar";
import { ACCOUNT } from "../constants/routes";

export default function Weight() {
  // get current user from context
  const { data, dateContext } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [date] = dateContext;

  const addWeightEntry = (e) => {
    e.preventDefault();
    setUserData({
      ...currentUserData,
      weight: {
        ...currentUserData.weight,
        [date]: Number(e.target.weight.value),
      },
    });
  };
  if (!currentUserData.hasOwnProperty("target")) return null;
  return (
    <>
      <h1> Your last recorded weight is</h1>
      <DatePicker />
      <span>
        {(currentUserData.weight && currentUserData.weight[date]) || `No entry`}
      </span>
      {currentUserData.targetWeight === 0 ? (
        <Link to={ACCOUNT}>Set your weigth goal </Link>
      ) : (
        currentUserData.weight[date] && (
          <div>
            <ProgressBar
              progress={currentUserData.targetWeight}
              target={currentUserData.weight[date]}
            />
            <span>
              {currentUserData.targetWeight - currentUserData.weight[date]}Lb to
              your goal
            </span>
          </div>
        )
      )}
      <br></br>
      <form onSubmit={addWeightEntry}>
        <input
          type="number"
          name="weight"
          required
          placeholder="inter weight"
        />
        <button>Add Entry+</button>
      </form>
    </>
  );
}
