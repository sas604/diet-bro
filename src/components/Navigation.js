import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { AuthContext } from "../Auth";
import { ReactComponent as HomeSvg } from "../img/home-solid.svg";
import { ReactComponent as WeightSvg } from "../img/weight-solid.svg";
import { ReactComponent as GraphSvg } from "../img/chart-line-solid.svg";
import { ReactComponent as CogSvg } from "../img/cog-solid.svg";
import "../css/nav.scss";

export default function Navigation() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return null;

  return (
    <nav className="global-nav">
      <NavLink to={ROUTES.HOME}>
        <HomeSvg />
      </NavLink>

      <NavLink to={ROUTES.WEIGHT}>
        <WeightSvg />
      </NavLink>

      <NavLink to={ROUTES.STATS}>
        <GraphSvg />
      </NavLink>

      <NavLink to={ROUTES.ACCOUNT}>
        <CogSvg />
      </NavLink>
    </nav>
  );
}
