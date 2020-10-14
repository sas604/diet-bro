import React from "react";
import { ReactComponent as Trash } from "../img/trash-solid.svg";
import "../css/meal.scss";

export default function Meal({ calories, name, id, onClick }) {
  return (
    <li className="meal-history-list-item">
      <span role="img" aria-label="food emoji">
        🍽️
      </span>
      <h4 className="name">{name}</h4>
      <p>
        {Math.round(calories)} <strong>kcal</strong>
      </p>
      <button className="del-btn" id={id} onClick={onClick}>
        <Trash className="trash-btn" />
      </button>
    </li>
  );
}
