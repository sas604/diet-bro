import React, { useContext, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Account from "./Account";
import DatePicker from "./DatePicker";
import Navigation from "./Navigation";
import Weight from "./Weight";
import { StateProvider } from "./StateProvider";
import Stats from "./Stats";
import CaloriesDisplay from "./CaloriesDisplay";
import { AuthContext } from "../Auth";
import AddMeal from "./AddMeal";
import styled from "styled-components";
import MealHistory from "./MealHistory";
import WeightDisplay from "./WeightDisplay";
import WeightHistory from "./WeightHistory";
import { TiArrowLeftThick } from "react-icons/ti";

const DashStyles = styled.div`
  min-height: 99.7vh;
  position: relative;
  display: grid;
  gap: 1rem 2rem;
  padding-right: 1rem;

  h2 {
    margin-top: 2rem;
  }
  grid-template-columns: 50px repeat(2, minmax(300px, 450px));
  grid-template-rows: 4rem 2.5rem minmax(50px, 200px) minmax(50px, 180px) auto;
  grid-template-areas:
    "nav header header"
    "nav  date  . "
    "nav  display  history"
    "nav   display history"
    "nav . .";

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
  const path = "/dashboard";
  const { currentUser } = useContext(AuthContext);

  return (
    <DashStyles className="dashboard">
      <StateProvider>
        <Switch>
          <Route exact path={path}>
            <h2 className="head">Welcome {currentUser.displayName}</h2>
            <DatePicker />
            <CaloriesDisplay />
            <MealHistory />
          </Route>
          <Route path={`${path}/addmeal`}>
            <Link className="head" to={"/"}>
              <TiArrowLeftThick /> Back to home
            </Link>
            <AddMeal />
          </Route>
          <Route path={`${path}/weight`}>
            <h2 className="head">Weight screen </h2>
            <DatePicker />
            <WeightDisplay />
            <WeightHistory />
          </Route>
          <Route path={`${path}/stats`}>
            <Stats />
          </Route>
          <Route path={`${path}/stats`}>
            <Weight />
          </Route>
          <Route path={`${path}/account`}>
            <Account />
          </Route>
        </Switch>
        <Navigation path={path} />
      </StateProvider>
    </DashStyles>
  );
}
