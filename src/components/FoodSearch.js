import React, { useEffect, useState } from 'react';
import { Audio as Loader } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchResult from './SearchResult';
import { TiTimes } from 'react-icons/ti';
import styled from 'styled-components';
import ControledInput from './ControledInput';
import { fdaUrl } from '../utils/api';
import { useFetch } from './hooks';
import { AiOutlineScan } from 'react-icons/ai';
import { ButtonStyle } from '../styles/CardStyles';

const ScannerButton = styled(ButtonStyle)`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-align: left;
  max-width: unset;
`;
const SearchStyles = styled.div`
  position: relative;
  .input-group {
    display: flex;
    gap: var(--space-sm);
    > div {
      flex: 1;
    }
    input {
      margin: 0;
    }
  }
  .search-button {
    position: absolute;
    top: 6px;
    right: 0;
    line-height: 1.3;
    font-size: 1.5rem;
    appearance: none;
    border: none;
    background: transparent;
    cursor: pointer;
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

// live food search component
export default function FoodSearch({
  handleClick,
  searchTerm,
  setSearchTearm,
  scanning,
  setScanning,
}) {
  const { data, loading, error } = useFetch(fdaUrl(searchTerm));
  // if there is a query value send request to api
  const handleSearch = (e) => {
    setSearchTearm(e.target.value);
  };

  return (
    <SearchStyles className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <ScannerButton type="button" onClick={() => setScanning(!scanning)}>
            <AiOutlineScan />
            {!scanning ? 'Scan Barcode' : 'Stop Scanning'}
          </ScannerButton>
          <ControledInput
            value={searchTerm}
            handeler={handleSearch}
            label="Food name"
            type="text"
            inputStyle={{ padding: ' 0.5em 0' }}
          />
        </div>
        {searchTerm && (
          <button
            className="search-button"
            type="button"
            title="clear search"
            onClick={() => {
              setSearchTearm('');
            }}
          >
            <TiTimes />
          </button>
        )}
      </form>
      <ul className="search-list">
        {loading ? (
          <li style={{ justifyContent: 'center' }}>
            <Loader
              className="loader"
              type="Puff"
              color={'#9163f2'}
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </li>
        ) : (
          data?.foods &&
          data.foods.map((el) => (
            <SearchResult
              calories={el?.foodNutrients[3]?.value}
              key={el.fdcId}
              id={el.fdcId}
              handleClick={handleClick}
              name={el.description}
            />
          ))
        )}
        {error && <li>{error.message}</li>}
      </ul>
    </SearchStyles>
  );
}
