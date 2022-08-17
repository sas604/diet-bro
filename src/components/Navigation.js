import { NavLink } from 'react-router-dom';
import { GoSignOut, GoGear, GoGraph, GoHome } from 'react-icons/go';
import { FaWeight } from 'react-icons/fa';
import styled from 'styled-components';
import { authFireBase } from './firebase';
import ThameSwitch from './ThemeSwitch';

const NavStyles = styled.nav`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--gray);

  @media (max-width: 700px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 3;
  }

  > * {
    font-size: 30px;
    color: var(--dark-purple);
    display: block;
    margin-top: var(--space-md);
    &:hover {
      transform: scale(1.1);
      color: var(--purple);
    }
  }

  a.active {
    color: var(--purple);
  }
  > :first-child {
    display: flex;
    justify-content: center;
    margin-top: var(--space-md);
  }
  svg {
    width: 30px;
  }
  button {
    appearance: none;
    margin-top: auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--green);
    font-size: 30px;
    text-align: center;
  }
  @media (max-width: 700px) {
    flex-direction: row;
    align-items: center;
    a,
    a:first-of-type,
    button {
      flex: 1;
      margin: 0;
      padding: 0;
    }
    padding: 0.7rem 0;
  }
`;

export default function Navigation({ path = '/dashboard' }) {
  return (
    <NavStyles className="global-nav">
      <NavLink title="Home" to={path}>
        <GoHome />
      </NavLink>

      <NavLink title="weight tracker" to={`${path}/weight`}>
        <FaWeight />
      </NavLink>

      {/* <NavLink title="statistics" to={`${path}/stats`}>
          <GoGraph />
        </NavLink> */}
      <ThameSwitch />
      <NavLink title="account settings" to={`${path}/account`}>
        <GoGear />
      </NavLink>

      <button
        title="signout"
        type="button"
        onClick={(f) => authFireBase.signOut()}
      >
        <GoSignOut />
      </button>
    </NavStyles>
  );
}
