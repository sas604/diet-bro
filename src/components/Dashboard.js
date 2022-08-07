import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { AuthContext } from '../Auth';
import styled from 'styled-components';

const DashStyles = styled.div`
  flex-grow: 1;
  max-width: 1500px;
  margin: 0 auto;

  padding-right: var(--space-xl);
  @media (max-width: 700px) {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }
`;
const LayoutStyles = styled.div`
  display: flex;
  position: relative;
  min-height: 100vh;
  gap: var(--space-xl);
  background-image: var(--pattern);
`;
export default function Dashboard() {
  // Get user info
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to={'/'} />;
  return (
    <LayoutStyles className="dashboard">
      <Navigation />
      <DashStyles>
        <Outlet />
      </DashStyles>
    </LayoutStyles>
  );
}
