import React, { useState, useEffect } from "react";
import { useFetch } from "./hooks";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SearchResult from "./SearchResult";
import { TiTimes } from "react-icons/ti";
import styled from "styled-components";
import ControledInput from "./ControledInput";

const SearchStyles = styled.div`
  position: relative;
  .search-button {
    position: absolute;
    top: 6px;
    right: 0;
    line-height: 1.3;
    font-size: 1.5rem;
    appearance: none;
    border: none;
    background: transparent;
  }
  ul {
    max-height: 280px;
    overflow-y: scroll;
    padding: 0;
    @media (max-width: 700px) {
      max-height: 50vh;
    }
  }
  li {
    padding: 0.5em 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li + li {
    margin-top: 0.5em;
    border-top: 3px solid var(--gray);
  }
  p {
    margin: 0;
  }
  p:last-of-type {
    margin-left: auto;
    margin-right: 0.5em;
  }
`;

export default function FoodSearch({ handleClick }) {
  const [query, setQuery] = useState(null);
  const [url, setUrl] = useState("");
  const [pendingFetch, searchData] = useFetch(url);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  console.log(searchData);
  useEffect(() => {
    if (!query) {
      setUrl(null);
      return;
    }
    setUrl(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_API_KEY}&query="+${query}"&dataType=Survey%20(FNDDS)`
    );
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const query = e.target.value.trim();
    setQuery(query.split(" ").join("%20+"));
  };
  useEffect(() => {
    if (query) {
      setOpenSearch(true);
    } else {
      setOpenSearch(false);
    }
  }, [query]);
  return (
    <SearchStyles className={`search ${openSearch && "open-search"}`}>
      <form onSubmit={(e) => e.preventDefault()}>
        <ControledInput
          value={search}
          handeler={handleSearch}
          label="Food name"
          type="text"
          inputStyle={{ padding: " 0.5em 0" }}
        />
        {openSearch && (
          <button
            className="search-button"
            type="button"
            title="clear search"
            onClick={() => {
              setSearch("");
              setOpenSearch(false);
              setQuery(null);
            }}
          >
            <TiTimes />
          </button>
        )}
      </form>
      <ul className="search-list">
        {pendingFetch ? (
          <li style={{ justifyContent: "center" }}>
            <Loader
              className="loader"
              type="Puff"
              color={"#9163f2"}
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </li>
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
    </SearchStyles>
  );
}
