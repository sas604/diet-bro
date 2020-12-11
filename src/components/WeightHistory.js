import React, { useContext } from "react";
import { FaWeight } from "react-icons/fa";
import styled from "styled-components";
import CardStyles from "../styles/CardStyles";
import { StateContext } from "./StateProvider";

const WeightHistoryStyles = styled(CardStyles)``;
export default function WeightHistory() {
  const { state, dispatch } = useContext(StateContext);
  const weightHistoryList = Object.keys(state.weight).length ? (
    Object.keys(state.weight).map((entry) => (
      <li key={entry}>
        {" "}
        <span className="date">📅-{entry}</span>{" "}
        <span className="entry">
          <FaWeight /> {state.weight[entry]}
        </span>
      </li>
    ))
  ) : (
    <li>No weight history</li>
  );

  return (
    <WeightHistoryStyles className="history">
      <ul>{weightHistoryList}</ul>
    </WeightHistoryStyles>
  );
}
