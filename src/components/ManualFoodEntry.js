import React from "react";
import { useState } from "react";
import { TiTimes } from "react-icons/ti";

export default function ManualFoodEntry({ handleSubmit, handleClick }) {
  const [food, setFood] = useState(null);
  return (
    <div className="wrapper bg-pattern">
      <button className="close-btn " onClick={handleClick}>
        <TiTimes />
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(food);
        }}
      >
        <label>
          Food name:
          <input
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            type="text"
            name="name"
            placeholder="name"
            required
          />
        </label>
        <label>
          Food Energy
          <input
            onChange={(e) => setFood({ ...food, kcal: Number(e.target.value) })}
            type="number"
            name="kcal"
            placeholder="Kcal"
            required
          />
        </label>
        <button className="btn bg-green">
          {`Add ${(food ? food.kcal : "") || 0} Kcal `}{" "}
        </button>
      </form>
    </div>
  );
}
