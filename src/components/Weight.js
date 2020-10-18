import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import DatePicker from "./DatePicker";
import { ACCOUNT } from "../constants/routes";
import Loader from "react-loader-spinner";

export default function Weight() {
  // get current user from context
  const { data, dateContext } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [date] = dateContext;

  if (!currentUserData.weight) return <Loader />;

  const weightFunc = (weight, target) => {
    if (!weight || !target) return { progress: null, toTarget: null };

    if (target > weight) {
      return {
        progress: (weight / target) * 100,
        toTarget: Math.abs(target - weight),
      };
    }
    return {
      progress: Math.round((target / weight) * 100),
      toTarget: Math.abs(target - weight),
    };
  };

  const progress = weightFunc(
    currentUserData.weight[date],
    currentUserData.targetWeight
  );

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

  return (
    <div className="wrapper bg-pattern">
      <h1> Your last recorded weight is</h1>
      <DatePicker />

      {currentUserData.weight ? (
        currentUserData.weight[date] ? (
          <>
            <span className="calories">
              {currentUserData.weight[date]}
              <strong> Lbs</strong>
            </span>
            <div className="progress-bar-wrapper">
              <p className="progress-bar-text">{`${progress.progress}% of your goal`}</p>
              <div className="progress-bar">
                <span
                  style={{
                    width: `${progress.progress}%`,
                  }}
                ></span>
              </div>
            </div>
          </>
        ) : (
          `No entries for this date `
        )
      ) : (
        `No entries for this date `
      )}
      {!currentUserData.targetWeight ? (
        <div>
          <p>
            `You didn't set your target weight,
            <Link to={ACCOUNT}> Set your target weight </Link>
          </p>
        </div>
      ) : (
        <p>
          {" "}
          {`${progress.toTarget} Lb to your target weight ${currentUserData.targetWeight} Lbs`}{" "}
        </p>
      )}

      <form onSubmit={addWeightEntry}>
        <label>
          Enter Weight:
          <input type="number" name="weight" required />
        </label>
        <button className="btn bg-green">Add Entry+</button>
      </form>
    </div>
  );
}
