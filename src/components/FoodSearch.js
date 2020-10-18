import React, { useState, useEffect } from "react";
import { useFetch } from "./hooks";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SearchResult from "./SearchResult";
import "../css/foodSearch.scss";
import { TiTimes } from "react-icons/ti";
import { useRef } from "react";

export default function FoodSearch({ handleClick }) {
  const [query, setQuery] = useState(null);
  const [url, setUrl] = useState("");
  const [pendingFetch, searchData] = useFetch(url);
  const [openSearch, setOpenSearch] = useState(false);
  const inputValue = useRef(null);

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
  useEffect(() => {
    if (query) {
      setOpenSearch(true);
    } else {
      setOpenSearch(false);
    }
  }, [query]);
  return (
    <div className={`search ${openSearch && "open-search"}`}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Start typing food name:
          <input
            ref={inputValue}
            onChange={handleSearch}
            type="text"
            placeholder="search"
          ></input>
        </label>
      </form>
      <ul className="search-list">
        {openSearch && (
          <button
            className="close-btn search-modal"
            onClick={() => {
              inputValue.current.value = "";
              setOpenSearch(false);
              setQuery(null);
            }}
          >
            <TiTimes />
          </button>
        )}
        {pendingFetch ? (
          <Loader
            className="loader"
            type="Puff"
            color={"#9163f2"}
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
