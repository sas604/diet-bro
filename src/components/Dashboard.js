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

export default function Dashboard() {
  const path = "/dashboard";
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <StateProvider>
        <Switch>
          <Route exact path={path}>
            <div>
              <h2 className="greet">{currentUser.displayName}</h2>
              <DatePicker></DatePicker>
              <CaloriesDisplay />
              <Link to={`${path}/addmeal`}>Add meal </Link>
              <Link to={`${path}/account`}> link </Link>
            </div>
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
    </div>
  );
}
