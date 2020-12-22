import React, { useContext, useState } from "react";
import CardStyles from "../styles/CardStyles";
import base from "./firebase";
import { StateContext } from "./StateProvider";
import ControledInput from "./ControledInput";

export default function Account() {
  const { state, dispatch } = useContext(StateContext);
  const [energy, setEnergy] = useState("");
  const [weight, setWeight] = useState("");

  const handeler = (seter) => (e) => seter(e.target.value);

  return (
    <CardStyles className="display">
      <p>Your current target weight is {state.data.targetWeight} lbs</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "updateSettings",
            field: "targetWeight",
            value: +e.target.weight.value,
          });
        }}
      >
        <ControledInput
          label="Weight"
          suffix="lbs"
          required
          handeler={handeler(setWeight)}
          value={weight}
          type="number"
          max={1000}
        />
        <button>Set weight</button>
      </form>

      <p>Your daily target calories intake is {state.data.targetEnergy} Cal</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({
            type: "updateSettings",
            field: "targetEnergy",
            value: +e.target.energy.value,
          });
        }}
      >
        <ControledInput
          label="Energy"
          suffix="Cal"
          required
          handeler={handeler(setEnergy)}
          value={energy}
          type="number"
          max={30000}
        />
        <button>Set Energy</button>
      </form>
      <button
        className=" btn bg-purple sign-out"
        onClick={() => base.auth().signOut()}
      >
        Sign Out
      </button>
    </CardStyles>
  );
}
