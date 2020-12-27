import React, { useCallback, useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import base, { provider } from "./firebase";
import { AuthContext } from "../Auth";
import * as ROUTES from "../constants/routes";
import { useForm, useHandleLogInTestUser } from "./hooks";
import { LandingStyles, SignIn } from "../styles/SignInStyles";
import { ButtonStyle } from "../styles/CardStyles";
import styled from "styled-components";
import ControledInput from "./ControledInput";

const SignInStyles = styled(SignIn)`
  label {
    margin: 0;
  }
  button + button {
    background-color: var(--green);
  }
`;

function SignUp({ history }) {
  const logWithTest = useHandleLogInTestUser(history);
  const { values, updateValue } = useForm({
    email: "",
    password: "",
  });
  const handleLogIn = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await base
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history, values.email, values.password]
  );
  // sign up with github, /// try to figure out why you need a use callback here
  const handleGitHubLogin = async (event) => {
    event.preventDefault();

    try {
      await base.auth().signInWithPopup(provider);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={"/home"} />;
  }
  return (
    <LandingStyles>
      <SignInStyles className="container">
        <ButtonStyle className="btn bg-green" onClick={handleGitHubLogin}>
          Login With Github
        </ButtonStyle>
        <ButtonStyle className="btn bg-blue" onClick={logWithTest}>
          Login With Test User
        </ButtonStyle>
        <span className="or">or</span>
        <form className="login-form" onSubmit={handleLogIn}>
          {/* <label>
            email:
            <input name="email" type="email" required></input>
          </label> */}
          <ControledInput
            label="Email"
            value={values.email}
            handeler={updateValue}
            type="email"
            required
          />
          <ControledInput
            label="Password"
            value={values.password}
            handeler={updateValue}
            type="password"
            required
          />
          {/* <label>
            password:
            <input name="password" type="password" required></input>
          </label> */}
          <ButtonStyle type="submit">Sign in</ButtonStyle>
        </form>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
        <p>
          No Account?<Link to={ROUTES.SIGN_UP}> Create One</Link>
        </p>
      </SignInStyles>
    </LandingStyles>
  );
}
export default withRouter(SignUp);
