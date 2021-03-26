import React, { useContext } from 'react';
import { StateContext } from './StateProvider';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DisplayStyles } from '../styles/CardStyles';
import { FaPlus } from 'react-icons/fa';
const StyledPath = styled.svg`
  fill: none;
  padding-top: 2em;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  grid-column: 1/-1;
  grid-row: 1;
  max-width: 250px;
  color: var(--dark-purple);
  filter: drop-shadow(0px 2px 2px rgba(50, 50, 0, 0.3));
  .cls-2 {
    stroke: var(--gray);
    stroke-width: 10px;
  }
  .cls-1 {
    --progress: 220;
    --progress: ${(props) => (props.progress <= 0 ? 0 : props.progress)};
    stroke: var(--dark-purple);
    stroke-width: 6px;
    stroke-dasharray: 220;
    stroke-dashoffset: var(--progress);
    transition: 400ms ease-out;
    animation: dash 400ms ease-out alternate;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: var(--progress);
    }
  }
`;

export default function CaloriesDisplay() {
  const { state } = useContext(StateContext);
  // can I do it better ?????
  // loop trough Meal history object and reduce it to single value
  const calloriesForThetDay = state.mealHistory[state.date]
    ? Object.keys(state.mealHistory[state.date])
        .map((entry) => state.mealHistory[state.date][entry])
        .reduce((acc, entry) => acc + entry.energy, 0)
    : 0;
  // round
  const progress = Math.round(
    (calloriesForThetDay / state.data.targetEnergy) * 100
  );
  if (state.loading) return <h1>Loading...</h1>;
  return (
    <DisplayStyles className="display">
      <StyledPath
        progress={220 - 220 * (progress / 100)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className="cls-2"
            d="M26,85A43,43,0,1,1,94,50c0,14.67-8.78,28.24-20,36"
          />
          <path
            className="cls-1"
            d="M26,85A43,43,0,1,1,94,50c0,14.67-8.78,28.24-20,36"
          />
        </g>
      </StyledPath>

      <span className="progress">
        <span>You've logged </span>
        <span className="number">{progress}%</span>
        <span>of your daily goal</span>
      </span>
      <span>
        <p>You've logged </p>
        <p>
          <span className="number-small">{calloriesForThetDay}</span> Cal
        </p>
      </span>
      <span>
        <p>Your goal is</p>
        <p>
          <span className="number-small">{state.data.targetEnergy}</span> Cal
        </p>
      </span>
      <Link to={`dashboard/addmeal`}>
        <FaPlus className="icon" />
        Add meal
      </Link>
    </DisplayStyles>
  );
}
