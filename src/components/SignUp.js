import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import base from "./firebase";
import { SIGN_IN } from "../constants/routes";
import { useForm } from "./hooks";
import ControledInput from "./ControledInput";
import { ButtonStyle } from "../styles/CardStyles";
import  { LandingStyles, SignIn } from "../styles/SignInStyles";
import styled from "styled-components";

const SignUpStyles = styled(SignIn)`
  label {
    margin: 0;
  }
`;

function SignUp({ history }) {
  const { values, updateValue } = useForm({
    email: "",
    password: "",
    name: "",
  });
  const handelSingUp = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await base
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);
        await base
          .auth()
          .currentUser.updateProfile({ displayName: values.name });
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },

    [history, values]
  );
  return (
    <LandingStyles>
      <h1>Sign Up</h1>
      <SignUpStyles>
        <form onSubmit={handelSingUp}>
          <ControledInput
            label="Email"
            type="email"
            handeler={updateValue}
            required
            value={values.email}
          />
          <ControledInput
            label="Password"
            value={values.password}
            handeler={updateValue}
            type="password"
            required
          />
          <ControledInput
            label="Name"
            value={values.name}
            handeler={updateValue}
            type="text"
            required
          />
          <ButtonStyle type="submit">Submit</ButtonStyle>
        </form>
        <p>
          Alredy have an account ?<Link to={SIGN_IN}> Sign In</Link>
        </p>
      </SignUpStyles>
    </LandingStyles>
  );
}
export default withRouter(SignUp);
