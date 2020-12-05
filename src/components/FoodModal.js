import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { useFetch } from "./hooks";
import FocusTrap from "focus-trap-react";
import { TiTimes } from "react-icons/ti";

const convertToOzAndRound = (gramms) => {
  const total = gramms / 28.3495;
  return Math.round(total * 10) / 10;
};

export default function FoodModal({ handleClick, foodId, returnData }) {
  const url = `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.REACT_APP_API_KEY}&nutrients=208`;
  const [, data] = useFetch(url);
  const [foodNutrients, setFoodNutrients] = useState(null);
  const [select, setSelect] = useState(true);

  useEffect(() => {
    if (data) {
      const portions = data.foodPortions.filter(
        (el) => el.portionDescription !== "Quantity not specified"
      );
      setFoodNutrients({
        kcal: data.foodNutrients[0].amount,

        portions: portions,
        name: data.description,
        portion: portions[0].gramWeight,
      });
    }
  }, [data]);

  if (!foodNutrients)
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      </div>
    );
  return (
    <div className="modal-wrapper">
      <FocusTrap>
        <div className="modal">
          <button
            className="close-btn"
            onClick={() => {
              setFoodNutrients(null);
              handleClick();
            }}
          >
            {" "}
            <TiTimes />
          </button>
          <h2 className="modal-heading">{foodNutrients.name}</h2>
          <p> please select portion or enter the exact weight</p>
          <label>
            <input
              type="radio"
              value="Portion"
              name="input option"
              checked={select}
              onChange={() => setSelect(true)}
            />{" "}
            Select portion
          </label>
          <label>
            <input
              type="radio"
              value="Weight"
              name="input option"
              checked={!select}
              onChange={() => setSelect(false)}
            />{" "}
            Enter Weight
          </label>
          {select ? (
            <label className="modal-select">
              Portion
              <select
                onChange={(e) =>
                  setFoodNutrients({
                    ...foodNutrients,
                    portion: +e.target.value,
                  })
                }
                defaultValue={foodNutrients.portion}
              >
                {foodNutrients.portions.map((el, i) => (
                  <option key={el.id} value={el.gramWeight}>
                    {el.portionDescription}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label>
              Weight in OZ
              <input
                onChange={(e) =>
                  setFoodNutrients({
                    ...foodNutrients,
                    portion: +e.target.value * 28,
                  })
                }
                type="number"
                defaultValue={convertToOzAndRound(foodNutrients.portion)}
              />
            </label>
          )}

          <button
            className="btn bg-green"
            tabIndex="1"
            onClick={() => {
              returnData(foodNutrients);
              handleClick();
            }}
          >
            <p className="modal-calories-dislpay">
              Add{" "}
              {Math.round(foodNutrients.kcal * (foodNutrients.portion / 100))}
              Kcal
            </p>
          </button>
        </div>
      </FocusTrap>
    </div>
  );
}
