import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../constants/routes';
import { DASH } from '../constants/routes';
import { useForm } from './hooks';
import ControledInput from './ControledInput';
import { ButtonStyle } from '../styles/CardStyles';
import { LandingStyles, SignIn } from '../styles/SignInStyles';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authFireBase } from './firebase';

const SignUpStyles = styled(SignIn)`
  label {
    margin: 0;
  }
`;

function SignUp() {
  const history = useNavigate();
  const { values, updateValue } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const handelSingUp = async (event) => {
    event.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        authFireBase,
        values.email,
        values.password
      );
      await updateProfile(user, { displayName: values.name });
      history(DASH);
    } catch (error) {
      alert(error);
    }
  };

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
export default SignUp;
