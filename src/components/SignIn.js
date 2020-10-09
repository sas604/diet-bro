import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import base, { provider } from "./firebase";
import { AuthContext } from "../Auth";
import * as ROUTES from "../constants/routes";

function SignUp({ history }) {
  const handleLogIn = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await base
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  // sign up with github, /// try to figure out why you need a use callback here
  const handleGitHubLogin = async (event) => {
    event.preventDefault();

    try {
      await base.auth().signInWithPopup(provider);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={"/home"} />;
  }
  return (
    <div>
      <button onClick={handleGitHubLogin}> login With Github </button>
      <button onClick={handleLogIn} disabled>
        Login with test user{" "}
      </button>
      <form onSubmit={handleLogIn}>
        <label>
          email
          <input name="email" placeholder="email" type="email"></input>
        </label>
        <label>
          password
          <input name="password" placeholder="password" type="password"></input>
        </label>
        <button type="submit">Sing in</button>
      </form>

      <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
      <span>
        No Account?<Link to={ROUTES.SIGN_UP}>Create One</Link>
      </span>
    </div>
  );
}
export default withRouter(SignUp);
