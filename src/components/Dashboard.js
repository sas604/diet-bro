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
import CardStyles from "../styles/CardStyles";

const DashStyles = styled.div`
  min-height: 99.7vh;
  display: grid;
  gap: 2rem;
  grid-template-columns: 50px repeat(2, minmax(200px, 400px));
  grid-template-rows: 4rem 3rem auto;
  grid-template-areas:
    "nav header header"
    "nav  date  . "
    "nav  display  history"
    "nav   display history"
    "nav    .      history";
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
            <CardStyles className="display">
              <CaloriesDisplay />
              <Link to={`${path}/addmeal`}>Add meal </Link>
            </CardStyles>
          </Route>
          <Route path={`${path}/addmeal`}>
            <AddMeal />
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
