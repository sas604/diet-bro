import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeSvg } from "../img/home-solid.svg";
import { ReactComponent as WeightSvg } from "../img/weight-solid.svg";
import { ReactComponent as GraphSvg } from "../img/chart-line-solid.svg";
import { ReactComponent as CogSvg } from "../img/cog-solid.svg";
import { GoSignOut } from "react-icons/go";
import styled from "styled-components";
import base from "./firebase";

const NavStyles = styled.nav`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--gray);

  a {
    color: #737179;
    display: block;
    margin-top: 1rem;
  }
  a.active {
    color: var(--dark-purple);
  }
  a:first-of-type {
    margin-top: 2rem;
  }
  svg {
    width: 30px;
  }
  button {
    margin-top: auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--green);
    font-size: 30px;
    text-align: center;
  }
`;

export default function Navigation({ path }) {
  return (
    <>
      <NavStyles className="global-nav">
        <NavLink exact to={path}>
          <HomeSvg />
        </NavLink>

        <NavLink to={`${path}/weight`}>
          <WeightSvg />
        </NavLink>

        <NavLink to={`${path}/stats`}>
          <GraphSvg />
        </NavLink>

        <NavLink to={`${path}/account`}>
          <CogSvg />
        </NavLink>
        <button type="button" onClick={() => base.auth().signOut()}>
          <GoSignOut />
        </button>
      </NavStyles>
    </>
  );
}
