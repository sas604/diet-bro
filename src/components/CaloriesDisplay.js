import React, { useContext } from "react";
import { StateContext } from "./StateProvider";

export default function CaloriesDisplay() {
  const { state } = useContext(StateContext);
  return (
    <div>
      <p>{state.date}</p>
    </div>
  );
}
