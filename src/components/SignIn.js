import { Link, Navigate, useNavigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { useForm, handleLogInTestUser } from './hooks';
import { LandingStyles, SignIn } from '../styles/SignInStyles';
import { ButtonStyle } from '../styles/CardStyles';
import styled from 'styled-components';
import ControledInput from './ControledInput';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from 'firebase/auth';
import { authFireBase as auth } from '../firebase';
import { useSelector } from 'react-redux';

const SignInStyles = styled(SignIn)`
  label {
    margin: 0;
  }
  button + button {
    background-color: var(--green);
  }
  a {
    color: var(--dark-green);
  }
`;

function SignInPage() {
  const { currentUser } = useSelector((state) => state.authState);
  const history = useNavigate();
  const logWithTest = handleLogInTestUser(history);
  const provider = new GithubAuthProvider();

  const { values, updateValue } = useForm({
    email: '',
    password: '',
  });
  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      history('/');
    } catch (error) {
      alert(error);
    }
  };
  // sign up with github, /// try to figure out why you need a use callback here
  const handleGitHubLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithPopup(auth, provider);
      history('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    return <Navigate to={'/dashboard'} />;
  }
  return (
    <LandingStyles>
      <SignInStyles className="container" data-testid="signinform">
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
export default SignInPage;
