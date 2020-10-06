import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { AuthContext } from "../Auth";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={"/home"} />;
  }
  return (
    <>
      <h1>Welcome to the DietBro, an app that keeps an eye on your diet </h1>
      <Link to={ROUTES.SIGN_IN}>Sign in </Link>
      <Link to={ROUTES.SIGN_UP}>Sign up </Link>
      <hr />
      <br />
    </>
  );
}
