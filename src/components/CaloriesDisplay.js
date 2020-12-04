import React, { useContext } from "react";
import { StateContext } from "./StateProvider";

export default function CaloriesDisplay() {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div>
      <p> you consumed </p>
    </div>
  );
}
