import React, { useContext } from 'react';
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Account from './Account';
import DatePicker from './DatePicker';
import Navigation from './Navigation';
import Weight from './Weight';
import { StateProvider } from './StateProvider';
import Stats from './Stats';
import CaloriesDisplay from './CaloriesDisplay';
import { AuthContext } from '../Auth';
import AddMeal from './AddMeal';
import styled from 'styled-components';
import MealHistory from './MealHistory';
import WeightDisplay from './WeightDisplay';
import WeightHistory from './WeightHistory';
import { TiArrowLeftThick } from 'react-icons/ti';
import { getAuth } from 'firebase/auth';

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
    nav {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
    }
  }
`;

export default function Dashboard() {
  const path = '/dashboard';
  // Get user info
  const { currentUser, updateName } = useContext(AuthContext);
  const context = useContext(AuthContext);
  console.log(context);
  if (!currentUser) return <Navigate to={'/'} />;
  return (
    <DashStyles className="dashboard">
      <StateProvider>
        <Outlet />
        <Navigation path={path} />
      </StateProvider>
    </DashStyles>
  );
}
{
  /* <Route
path={path}
element={
  <>
    
  </>
}
></Route>
<Route
path={`${path}/addmeal`}
element={
  <>
    <Link className="head" to={'/'}>
      <TiArrowLeftThick /> Back to home
    </Link>
    <AddMeal />
  </>
}
></Route>
<Route
path={`${path}/weight`}
element={
  <>
    {/* <h2 className="head">Weight Tracking</h2> */
}
//     <DatePicker />
//     <WeightDisplay />
//     <WeightHistory />
//   </>
// }
// ></Route> */}
/* <Route path={`${path}/stats`}>
            <Stats />
          </Route>
          <Route path={`${path}/stats`}>
            <Weight />
          </Route>
          <Route path={`${path}/account`}>
            <>
             <h2 className="head">Account Settings </h2> 
              <Account name={currentUser.displayName} updateName={updateName} />
            </>
          </Route> */
