import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Account from "./Account";
import DatePicker from "./DatePicker";
import Navigation from "./Navigation";
import Weight from "./Weight";
import { StateProvider } from "./StateProvider";
import Stats from "./Stats";

export default function Dashboard() {
  const path = "/dashboard";
  return (
    <StateProvider>
      <Switch>
        <Route exact path={path}>
          <DatePicker></DatePicker>
          <p> it is home page </p>
          <Link to={`${path}/account`}> link </Link>
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
  );
}
