import React, { useState, useContext } from "react";

import FoodSearch from "./FoodSearch";
import FoodModal from "./FoodModal";
import ManualFoodEntry from "./ManualFoodEntry";
import { useHistory } from "react-router-dom";

import { StateContext } from "./StateProvider";
import styled from "styled-components";
import CardStyles from "../styles/CardStyles";

const AddFoodStyles = styled(CardStyles)``;

export default function AddMeal() {
  const [foodItemId, setFoodItemId] = useState(null);

  const [openAddFood, setOpenAddFood] = useState(false);

  const { dispatch } = useContext(StateContext);
  const history = useHistory();
  const getFoodItem = (e) => {
    setFoodItemId(e.target.id);
  };
  const addMeal = (food) => {
    const energy =
      Math.round(food.portion && (food.kcal / 100) * food.portion * 10) / 10;
    dispatch({
      type: "addMeal",
      food: { name: food.name, energy: energy || food.kcal },
    });

    history.push("/dashboard");
  };

  const addManualFoodEntry = (food) => addMeal(food);

  const updateFoodState = (data) => {
    addMeal(data);
  };

  return (
    <>
      {foodItemId && (
        <FoodModal
          returnData={updateFoodState}
          handleClick={() => setFoodItemId(null)}
          foodId={foodItemId}
        />
      )}
      <AddFoodStyles className="display">
        <FoodSearch handleClick={getFoodItem} />
        <span className="or">or</span>
        <button
          className="btn bg-green add-meal"
          onClick={() => setOpenAddFood(true)}
        >
          Add Food Manually
        </button>
        <ManualFoodEntry
          handleSubmit={addManualFoodEntry}
          handleClick={() => setOpenAddFood(false)}
        />
      </AddFoodStyles>
    </>
  );
}
