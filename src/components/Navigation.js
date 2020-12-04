import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeSvg } from "../img/home-solid.svg";
import { ReactComponent as WeightSvg } from "../img/weight-solid.svg";
import { ReactComponent as GraphSvg } from "../img/chart-line-solid.svg";
import { ReactComponent as CogSvg } from "../img/cog-solid.svg";
import "../css/nav.scss";

export default function Navigation({ path }) {
  return (
    <nav className="global-nav">
      <NavLink exact to={path} to={`${path}`}>
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
    </nav>
  );
}
