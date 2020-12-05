import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import DatePicker from "./DatePicker";
import { ACCOUNT } from "../constants/routes";
import Loader from "react-loader-spinner";
import { useSpring, animated } from "react-spring";

export default function Weight() {
  // get current user from context
  const { data, dateContext } = useContext(AuthContext);
  const [currentUserData, setUserData] = data;
  const [date] = dateContext;
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const props = useSpring({
    number: animatedNumber,
    from: { number: 0 },
  });
  useEffect(() => {
    if (currentUserData.weight[date]) {
      setAnimatedNumber(currentUserData.weight[date]);
    }
  }, [currentUserData.weight, date]);
  if (!currentUserData.weight)
    return (
      <Loader
        className="loader"
        type="Puff"
        color={"#9163f2"}
        height={100}
        width={100}
        style={{ margin: "10rem auto", textAlign: "center" }}
        timeout={11000} //3 secs
      />
    );

  const weightFunc = (weight, target) => {
    if (!weight || !target) return { progress: 0, toTarget: 0 };

    if (target > weight) {
      return {
        progress: Math.round((weight / target) * 100),
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
      <h1>Weight Data</h1>
      <DatePicker />
      <div className="weight-container">
        <h3>Your last recorded weight is</h3>
        {currentUserData.weight ? (
          currentUserData.weight[date] ? (
            <>
              <span className="calories">
                <animated.span>
                  {props.number.interpolate((x) => Math.floor(x))}
                </animated.span>
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
            {`${progress.toTarget} Lb to your target weight ${Math.round(
              currentUserData.targetWeight
            )} Lbs`}
          </p>
        )}
      </div>
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
