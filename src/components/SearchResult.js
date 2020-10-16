import React from "react";

export default function SearchResult({ id, handleClick, name, calories }) {
  return (
    <button className="search-result-list-item" id={id} onClick={handleClick}>
      <p>{name}</p>
      <p>{calories}kcal/100g</p>
    </button>
  );
}
