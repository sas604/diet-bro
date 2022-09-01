import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { db, firebasePathListner } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { fetchItemsFulfiled } from '../features/meals/mealSlice';
import {
  fetchUserDataFulfiled,
  fetchWeightFulfiled,
} from '../features/userData/userDataSlice';

const DashStyles = styled.div`
  flex-grow: 1;
  max-width: 1500px;
  margin: 0 auto;
  padding-right: var(--space-xl);
  @media (max-width: 700px) {
    padding-bottom: 3rem;
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
  const {
    date,
    authState: { currentUser },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentUser) return;
    const fireDB = ref(db, `users/${currentUser.uid}/mealHistory/${date}`);
    const userRef = ref(db, `users/${currentUser.uid}/data`);
    const weightRef = ref(db, `users/${currentUser.uid}/weight`);

    const unsubscribe = [
      firebasePathListner(fireDB, onValue, fetchItemsFulfiled)(dispatch),
      firebasePathListner(userRef, onValue, fetchUserDataFulfiled)(dispatch),
      firebasePathListner(weightRef, onValue, fetchWeightFulfiled)(dispatch),
    ];
    return () => unsubscribe.forEach((f) => f());
  }, [currentUser, dispatch, date]);

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
