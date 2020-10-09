import React, { useCallback } from "react";
import { withRouter } from "react-router";
import base from "./firebase";

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
    <div>
      <form onSubmit={handelSingUp}>
        <label>
          email
          <input
            name="email"
            placeholder="email"
            type="email"
            autoComplete="new-password"
          ></input>
        </label>
        <hr />
        <label>
          password
          <input
            name="password"
            placeholder="password"
            type="password"
            autoComplete="new-password"
          ></input>
        </label>
        <hr />
        <label>
          Name
          <input name="name" placeholder="Name" type="text" required></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default withRouter(SignUp);
