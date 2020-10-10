import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as ROUTES from "./constants/routes";
import Landing from "./components/Landing";
import Account from "./components/Account";
import Home from "./components/Home";
import Weight from "./components/Weight";
import PasswordRestore from "./components/PasswordRestore";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./components/PrivateRoute";
import AddMeal from "./components/AddMeal";

import Stats from "./components/Stats";

function App() {
  return (
    <AuthProvider>
      <>
        <Router>
          <PrivateRoute path={ROUTES.HOME} component={Home} />
          <PrivateRoute path={ROUTES.WEIGHT} component={Weight} />
          <PrivateRoute path={ROUTES.STATS} component={Stats} />
          <PrivateRoute path={ROUTES.ACCOUNT} component={Account} />
          <PrivateRoute path={ROUTES.ADD_MEAL} component={AddMeal} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordRestore} />
          <Route exact path={"/"} component={Landing} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Navigation />
        </Router>
      </>
    </AuthProvider>
  );
}

export default App;
