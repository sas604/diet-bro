import React from "react";
import { useState } from "react";
import { ButtonStyle } from "../styles/CardStyles";
import ControledInput from "./ControledInput";

export default function ManualFoodEntry({ handleSubmit }) {
  const [food, setFood] = useState({});
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(food);
      }}
    >
      <ControledInput
        label="Food name"
        handeler={(e) => setFood({ ...food, name: e.target.value })}
        type="text"
        value={food.name || ""}
        name="name"
        required={true}
      />
      <ControledInput
        handeler={(e) => setFood({ ...food, kcal: Number(e.target.value) })}
        value={food.kcal || ""}
        type="number"
        name="kcal"
        label="Energy"
        required={true}
      />
      <ButtonStyle className="btn bg-green">
        {`Add ${(food ? food.kcal : "") || 0} Cal `}{" "}
      </ButtonStyle>
    </form>
  );
}
