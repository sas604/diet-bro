import React from "react";

export default function Meal({ name, id, onClick }) {
  return (
    <li className="meal-history-list-item">
      <h4>{name}</h4>
      <button id={id} onClick={onClick}>
        Delete
      </button>
    </li>
  );
}
