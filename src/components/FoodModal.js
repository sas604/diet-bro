import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { useFetch } from "./hooks";

export default function FoodModal({ handleClick, foodId, returnData }) {
  const url = `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.REACT_APP_API_KEY}&nutrients=208`;
  const [, data] = useFetch(url);
  const [foodNutrients, setFoodNutrients] = useState(null);

  useEffect(() => {
    if (data) {
      setFoodNutrients({
        kcal: data.foodNutrients[0].amount,

        portions: data.foodPortions.filter(
          (el) => el.portionDescription !== "Quantity not specified"
        ),
        name: data.description,
        portion: 100,
      });
    }
  }, [data]);

  if (!foodNutrients)
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  return (
    <div>
      Food Modal
      <button onClick={handleClick}></button>
      <div>
        <p>
          {Math.round(foodNutrients.kcal * (foodNutrients.portion / 100))} Kcal
        </p>
      </div>
      <select
        onChange={(e) =>
          setFoodNutrients({
            ...foodNutrients,
            portion: Math.round(parseInt(e.target.value)),
          })
        }
        defaultValue="100"
      >
        <option key="100" value="100">
          100g
        </option>
        {foodNutrients.portions.map((el) => (
          <option key={el.id} value={el.gramWeight}>
            {el.portionDescription}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          returnData(foodNutrients);
          handleClick();
        }}
      >
        {" "}
        Add +
      </button>
    </div>
  );
}
