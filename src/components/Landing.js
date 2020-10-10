import React, { useContext, useCallback } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { AuthContext } from "../Auth";
import base from "./firebase";
import "../css/landing.scss";
import { ReactComponent as UserSvg } from "../img/user-regular.svg";

function Landing({ history }) {
  const { currentUser } = useContext(AuthContext);

  const handleLogInTestUser = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await base
          .auth()
          .signInWithEmailAndPassword("test@tagunovdesign.com", "123456");
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  if (currentUser) {
    return <Redirect to={"/home"} />;
  }

  return (
    <div className="wrapper bg-pattern diagonal">
      <h1 className="landing-heading">
        Welcome to the <strong>DietBro</strong>, an app that keeps an eye on
        your diet.
      </h1>
      <section className="sign-in-section">
        <UserSvg className="user-svg" />
        <Link className="bg-green btn  " to={ROUTES.SIGN_IN}>
          Sign In
        </Link>
        <button className="bg-blue btn  " onClick={handleLogInTestUser}>
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
