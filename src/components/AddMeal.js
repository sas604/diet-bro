import React, { useState, useContext } from "react";

import { AuthContext } from "../Auth";
import { getTime } from "date-fns";
import FoodSearch from "./FoodSearch";
import FoodModal from "./FoodModal";
import ManualFoodEntry from "./ManualFoodEntry";
import { Link, useHistory } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { StateContext } from "./StateProvider";

export default function AddMeal() {
  const [foodItemId, setFoodItemId] = useState(null);

  const [openAddFood, setOpenAddFood] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const history = useHistory();
  const getFoodItem = (e) => {
    setFoodItemId(e.target.id);
  };
  const addMeal = (food) => {
    dispatch({ type: "addMeal", food: food });
    history.push("/dashboard");
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
        <Link className="back-link" to={"/"}>
          <TiArrowLeftThick /> Back to home
        </Link>
        <FoodSearch handleClick={getFoodItem} />
        <span className="or">or</span>
        <button
          className="btn bg-green add-meal"
          onClick={() => setOpenAddFood(true)}
        >
          Add Food Manually
        </button>
      </div>
    </>
  );
}
