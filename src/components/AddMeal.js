import React, { useState, useContext } from "react";

import FoodSearch from "./FoodSearch";
import FoodModal from "./FoodModal";
import ManualFoodEntry from "./ManualFoodEntry";
import { useHistory } from "react-router-dom";

import { StateContext } from "./StateProvider";
import styled from "styled-components";
import CardStyles from "../styles/CardStyles";
import { TabsStyle } from "../styles/CardStyles";

const AddFoodStyles = styled(CardStyles)`
  max-width: 600px;
  margin: 0;
  input {
    margin-bottom: 1rem;
  }
  @media (max-width: 700px) {
    margin-top: 1rem;
    min-height: 70vh;
    align-items: flex-start;
  }
`;

export default function AddMeal() {
  const [foodItemId, setFoodItemId] = useState(null);
  const [openAddFood, setOpenAddFood] = useState(false);
  const [select, setSelect] = useState(true);
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
      <AddFoodStyles className="search">
        <TabsStyle>
          <input
            id="search"
            type="radio"
            value="Search"
            name="input option"
            checked={select}
            onChange={() => setSelect(true)}
          />
          <label htmlFor="search">Search database</label>

          <input
            id="manual"
            type="radio"
            value="manual"
            name="input option"
            checked={!select}
            onChange={() => setSelect(false)}
          />
          <label htmlFor="manual">Type manualy</label>
        </TabsStyle>
        {select ? (
          <FoodSearch handleClick={getFoodItem} />
        ) : (
          <ManualFoodEntry
            handleSubmit={addManualFoodEntry}
            handleClick={() => setOpenAddFood(false)}
          />
        )}
      </AddFoodStyles>
    </>
  );
}
