import React, { useState, useContext } from "react";

import { AuthContext } from "../Auth";
import { getTime } from "date-fns";
import FoodSearch from "./FoodSearch";
import FoodModal from "./FoodModal";
import ManualFoodEntry from "./ManualFoodEntry";

export default function AddMeal({ history }) {
  const [foodItemId, setFoodItemId] = useState(null);
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
    history.push("/home");
  };

  const addManualFoodEntry = (food) => addMeal(food);

  const updateFoodState = (data) => {
    addMeal(data);
  };

  if (openAddFood)
    return (
      <ManualFoodEntry
        handleSubmit={addManualFoodEntry}
        handleClick={() => setOpenAddFood(false)}
      />
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
      <div className="wrapper bg-pattern">
        <h1>Add new meal entry</h1>
        <FoodSearch handleClick={getFoodItem} />
        <span className="or">or</span>
        <button className="btn bg-green" onClick={() => setOpenAddFood(true)}>
          Add Food Manually
        </button>
      </div>
    </>
  );
}
