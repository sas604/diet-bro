import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function navigation() {
  return (
    <nav className="global-nav">
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.PASSWORD_FORGET}>Restore Password</Link>
        </li>
      </ul>
    </nav>
  );
}
