import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../Auth";
import { getTime, set } from "date-fns";
import FoodSearch from "./FoodSearch";
import FoodModal from "./FoodModal";

const request = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const res = response.json();
  return res;
};

export default function AddMeal({ history }) {
  const [foodItemId, setFoodItemId] = useState(null);
  const [food, setFood] = useState(null);
  const { data, dateContext } = useContext(AuthContext);
  const [openAddFood, setOpenAddFood] = useState(false);
  const [currentDate] = dateContext;
  const [currentUserData, setUserData] = data;

  const getFoodItem = (e) => {
    setFoodItemId(e.target.id);
  };
  const addMeal = (food) => {
    const stamp = getTime(new Date());
    setUserData({
      ...currentUserData,
      [currentDate]: {
        ...currentUserData[currentDate],
        [stamp]: food,
      },
    });
    setFood(null);
    history.push("/home");
  };

  const addManualFoodEntry = (e) => {
    e.preventDefault();
    addMeal(food);
  };
  const updateFoodState = (data) => {
    addMeal(data);
  };

  if (openAddFood)
    return (
      <>
        <button onClick={() => setOpenAddFood(false)}></button>
        <form onSubmit={addManualFoodEntry}>
          <input
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            type="text"
            name="name"
            placeholder="name"
            required
          />
          <input
            onChange={(e) => setFood({ ...food, kcal: Number(e.target.value) })}
            type="number"
            name="kcal"
            placeholder="KCal"
            required
          />
          <button> Add</button>
        </form>
      </>
    );

  return (
    <>
      {foodItemId && (
        <FoodModal
          returnData={updateFoodState}
          handleClick={() => setFoodItemId(null)}
          foodId={foodItemId}
        />
      )}
      <h1>Add new meal entry</h1>
      <FoodSearch handleClick={getFoodItem} />
      <span> or add food manually</span>
      <br />
      <button onClick={() => setOpenAddFood(true)}>Add food +</button>
    </>
  );
}
