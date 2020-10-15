import React, { useState, useEffect } from "react";
import { useFetch } from "./hooks";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SearchResult from "./SearchResult";

export default function FoodSearch({ handleClick }) {
  const [query, setQuery] = useState(null);
  const [url, setUrl] = useState("");
  const [pendingFetch, searchData] = useFetch(url);
  useEffect(() => {
    if (!query) {
      setUrl(null);
      return;
    }
    setUrl(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&dataType=Survey%20(FNDDS)`
    );
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value.trim();
    setQuery(query.split(" ").join("%20"));
  };

  return (
    <div className="search">
      <span>Search for food</span>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="search food"
        ></input>
      </form>
      <ul className="search-list">
        {pendingFetch ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          searchData &&
          searchData.foods.map((el) => (
            <SearchResult
              calories={el.foodNutrients[3].value}
              key={el.fdcId}
              id={el.fdcId}
              handleClick={handleClick}
              name={el.description}
            />
          ))
        )}
      </ul>
    </div>
  );
}
