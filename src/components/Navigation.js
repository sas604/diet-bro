import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GoSignOut, GoGear, GoGraph, GoHome } from "react-icons/go";
import { FaWeight } from "react-icons/fa";
import styled from "styled-components";
import base from "./firebase";
import { AuthContext } from "../Auth";

const NavStyles = styled.nav`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--gray);

  a {
    font-size: 30px;
    color: #737179;
    display: block;
    margin-top: 1rem;
    &:hover {
      transform: scale(1.1);
      color: var(--purple);
    }
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
    appearance: none;
    margin-top: auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--green);
    font-size: 30px;
    text-align: center;
  }
  @media (max-width: 700px) {
    flex-direction: row;
    align-items: center;
    a,
    a:first-of-type,
    button {
      flex: 1;
      margin: 0;
      padding: 0;
    }
    padding: 0.7rem 0;
  }
`;

export default function Navigation({ path }) {
  const { unsubcribe } = useContext(AuthContext);
  return (
    <>
      <NavStyles className="global-nav">
        <NavLink title="Home" exact to={path}>
          <GoHome />
        </NavLink>

        <NavLink title="weight tracker" to={`${path}/weight`}>
          <FaWeight />
        </NavLink>

        <NavLink title="statistics" to={`${path}/stats`}>
          <GoGraph />
        </NavLink>

        <NavLink title="account settings" to={`${path}/account`}>
          <GoGear />
        </NavLink>
        <button
          title="signout"
          type="button"
          onClick={() => {
            unsubcribe();
            base.auth().signOut();
          }}
        >
          <GoSignOut />
        </button>
      </NavStyles>
    </>
  );
}
