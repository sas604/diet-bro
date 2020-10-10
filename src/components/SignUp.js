import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import base from "./firebase";
import { SIGN_IN } from "../constants/routes";

function SignUp({ history }) {
  const handelSingUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, name } = event.target.elements;
      try {
        await base
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        await base
          .auth()
          .currentUser.updateProfile({ displayName: name.value });
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },

    [history]
  );
  return (
    <div className="wrapper bg-pattern sign-in ">
      <form onSubmit={handelSingUp}>
        <label>
          Email:
          <input
            name="email"
            placeholder="email"
            type="email"
            autoComplete="new-password"
          ></input>
        </label>
        <label>
          Password:
          <input
            name="password"
            placeholder="password"
            type="password"
            autoComplete="new-password"
          ></input>
        </label>
        <label>
          Name:
          <input name="name" placeholder="Name" type="text" required></input>
        </label>
        <button className="btn bg-green" type="submit">
          Submit
        </button>
      </form>
      <p>
        Alredy have account ?<Link to={SIGN_IN}> Sign In</Link>
      </p>
    </div>
  );
}
export default withRouter(SignUp);
