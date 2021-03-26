import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { ButtonStyle } from '../styles/CardStyles';

const AddButtonStyle = styled(ButtonStyle)`
  width: 2rem;
  padding: 0.5em;
  svg {
    pointer-events: none;
  }
`;

export default function SearchResult({ id, handleClick, name, calories }) {
  return (
    <li className="search-result-list-item">
      <p>{name}</p>
      <p>{calories}kcal/100g</p>
      <AddButtonStyle
        type="button"
        id={id}
        onClick={handleClick}
        title="add food"
      >
        <FaPlus />
      </AddButtonStyle>
    </li>
  );
}
