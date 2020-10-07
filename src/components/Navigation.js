import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { AuthContext } from "../Auth";
import { ReactComponent as HomeSvg } from "../img/home-solid.svg";
import { ReactComponent as WeightSvg } from "../img/weight-solid.svg";
import { ReactComponent as GraphSvg } from "../img/chart-line-solid.svg";
import { ReactComponent as CogSvg } from "../img/cog-solid.svg";

export default function Navigation() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return null;

  return (
    <nav className="global-nav">
      <ul style={{ display: "flex", listStyleType: "none" }}>
        <li>
          <NavLink to={ROUTES.HOME}>
            <HomeSvg style={{ width: 50 }} />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.WEIGHT}>
            <WeightSvg style={{ width: 50 }} />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.STATS}>
            <GraphSvg style={{ width: 50 }} />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ACCOUNT}>
            <CogSvg style={{ width: 50 }} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
