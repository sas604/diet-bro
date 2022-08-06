import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { AuthContext } from '../Auth';
import styled from 'styled-components';

const DashStyles = styled.div`
  min-height: 99.7vh;
  background-image: var(--pattern);
  position: relative;
  display: grid;
  gap: 1.5rem 2rem;
  padding-right: 1rem;

  h2 {
    margin-top: 2rem;
  }
  grid-template-columns: 50px repeat(2, minmax(300px, 450px));
  grid-template-rows: 4rem 2.5rem minmax(50px, 250px) minmax(50px, 250px) auto;
  grid-template-areas:
    'nav header header'
    'nav  date  . '
    'nav  display  history'
    'nav   display history'
    'nav . .';

  nav {
    grid-area: nav;
  }

  .head {
    grid-area: header;
    margin: 0;
    align-self: end;
  }
  .display {
    grid-area: display;
  }
  .search {
    grid-row: span 3;
    grid-column: span 2;
  }
  .history {
    grid-area: history;
    @media (max-width: 700px) {
      margin-bottom: 3rem;
    }
  }
  .account {
    grid-row: 3/5;
  }

  @media (max-width: 700px) {
    > * {
      margin-top: 1rem;
    }
    display: block;
    padding: 2rem 1rem;
  }
`;

export default function Dashboard() {
  // Get user info
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to={'/'} />;
  return (
    <DashStyles className="dashboard">
      <Outlet />
      <Navigation />
    </DashStyles>
  );
}
