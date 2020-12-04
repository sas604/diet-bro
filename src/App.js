import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Landing from "./components/Landing";
import PasswordRestore from "./components/PasswordRestore";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import { StateProvider } from "./components/StateProvider";

function App() {
  return (
    <AuthProvider>
      <>
        <Router>
          <Switch>
            <PrivateRoute path={"/dashboard"} component={Dashboard} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordRestore} />
            <Route exact path={"/"} component={Landing} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
          </Switch>
        </Router>
      </>
    </AuthProvider>
  );
}

export default App;
