import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { ReactComponent as UserSvg } from '../img/user-regular.svg';
import { handleLogInTestUser } from './hooks';
import styled from 'styled-components';
import { ButtonStyle } from '../styles/CardStyles';
import { LandingStyles } from '../styles/SignInStyles';
import { useSelector } from 'react-redux';

const SignIn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & :nth-child(even) {
    background-color: var(--green);
  }
  * + * {
    margin-top: 1rem;
  }
  border: 5px solid var(--purple);
  border-radius: 3px;
  padding: 2rem 3rem;
  background-color: var(--bg-primary);
  position: relative;
  z-index: 1;
  max-width: 400px;
  margin: 1.5rem auto;
  svg {
    color: var(--gray);
    width: 75px;
    margin: 0 auto;
    display: block;
  }
`;
function Landing() {
  const history = useNavigate();
  const {
    authState: { currentUser },
  } = useSelector((state) => state);
  const logInWithTest = handleLogInTestUser(history);
  if (currentUser) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <LandingStyles>
      <h1 className="landing-heading">
        Welcome to the <strong>DietBro</strong>, the app that keeps an eye on
        your diet.
      </h1>
      <SignIn>
        <UserSvg className="user-svg" />
        <ButtonStyle as={Link} to={ROUTES.SIGN_IN}>
          Sign In
        </ButtonStyle>
        <ButtonStyle className="bg-blue btn  " onClick={logInWithTest}>
          Login With Test User
        </ButtonStyle>
        <ButtonStyle as={Link} to={ROUTES.SIGN_UP}>
          Sign Up
        </ButtonStyle>
      </SignIn>
    </LandingStyles>
  );
}
export default Landing;
