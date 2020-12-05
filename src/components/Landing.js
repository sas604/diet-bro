import React, { useContext } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { AuthContext } from "../Auth";
import { ReactComponent as UserSvg } from "../img/user-regular.svg";
import { useHandleLogInTestUser } from "./hooks";

function Landing({ history }) {
  const { currentUser } = useContext(AuthContext);
  const logInWithTest = useHandleLogInTestUser(history);
  if (currentUser) {
    return <Redirect to={"/dashboard"} />;
  }

  return (
    <div className="wrapper bg-pattern diagonal no-grid">
      <h1 className="landing-heading">
        Welcome to the <strong>DietBro</strong>, an app that keeps an eye on
        your diet.
      </h1>
      <section className="sign-in-section">
        <UserSvg className="user-svg" />
        <Link className="bg-green btn  " to={ROUTES.SIGN_IN}>
          Sign In
        </Link>
        <button className="bg-blue btn  " onClick={logInWithTest}>
          Login With Test User
        </button>
        <Link className="btn bg-purple" to={ROUTES.SIGN_UP}>
          Sign Up
        </Link>
      </section>
    </div>
  );
}
export default withRouter(Landing);
