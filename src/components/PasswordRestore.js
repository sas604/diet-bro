import { useState } from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../styles/CardStyles';
import { LandingStyles, SignIn } from '../styles/SignInStyles';
import ControledInput from './ControledInput';
import BackButton from './BackButton';
import { SIGN_IN } from '../constants/routes';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authFireBase as auth } from './firebase';

const ResetPasswordStyles = styled(SignIn)`
  label {
    margin-top: 0;
  }
`;

export default function PasswordRestore() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((e) => {
        setAlert('success');
      })
      .catch((error) => {
        setAlert('error');
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <LandingStyles>
      <ResetPasswordStyles>
        <h1>Password Reset</h1>
        <p>Enter your email to get password reset instructions </p>
        <form onSubmit={handleSubmit}>
          <ControledInput
            label="Email"
            value={email}
            handeler={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <ButtonStyle>Submit</ButtonStyle>
        </form>
        <BackButton route={SIGN_IN} text="Back to Sign In" />
        {alert === 'success' && (
          <p>
            An email with instructions was sent to the provided email address
          </p>
        )}{' '}
        {alert === 'error' && <p> Something went wrong </p>}
      </ResetPasswordStyles>
    </LandingStyles>
  );
}
