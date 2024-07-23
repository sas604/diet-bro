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
import Pagination from './Pagination';
import { motion } from 'framer-motion';

const ScannerButton = styled(ButtonStyle)`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-align: left;
  max-width: unset;
`;
const SearchStyles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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
  .search-list {
    flex: 1;
    list-style: none;
    padding: 0;
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
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(fdaUrl(searchTerm, page, 10));

  const handleSearch = (e) => {
    setScanning(false);
    setSearchTearm(e.target.value);
  };

  return (
    <>
      <SearchStyles className="search">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <ScannerButton
              type="button"
              onClick={() => {
                setScanning(!scanning);
                setSearchTearm('');
              }}
            >
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
            data.foods.s((el) => (
              <SearchResult
                el={el}
                handleClick={handleClick}
                open={open === el.fdcId}
                setOpen={setOpen}
                key={el.fdcId}
              />
            ))
          )}
          {data && !data.foods.length && <li>No Results</li>}
          {error && <li>{error.message}</li>}
        </ul>

        {data && (
          <Pagination
            pages={data.pageList}
            currentPage={page}
            setPage={setPage}
          ></Pagination>
        )}
      </SearchStyles>
    </>
  );
}
