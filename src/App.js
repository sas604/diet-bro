import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as ROUTES from "./constants/routes";
import Landing from "./components/Landing";
import Account from "./components/Account";
import Home from "./components/Home";
import PasswordRestore from "./components/PasswordRestore";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./components/PrivateRoute";
import AddMeal from "./components/AddMeal";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <PrivateRoute path={ROUTES.HOME} component={Home} />
        <PrivateRoute path={ROUTES.ACCOUNT} component={Account} />
        <PrivateRoute path={ROUTES.ADD_MEAL} component={AddMeal} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordRestore} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
      </Router>
    </AuthProvider>
  );
}

export default App;
