import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import { StateContext } from "./StateProvider";
export default function Weight() {
  const { state, dispatch } = useContext(StateContext);
  if (state.loaded)
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

  const addWeightEntry = (e) => {
    e.preventDefault();

    dispatch({ type: "setWeight", weight: +e.target.weight.value });
    console.log(e.target.weight.value);
  };

  return (
    <form onSubmit={addWeightEntry}>
      <label>
        Enter Weight:
        <input type="number" name="weight" required />
      </label>
      <button className="btn bg-green">Add Entry+</button>
    </form>
  );
}
