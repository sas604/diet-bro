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
        history.push("/");
      } catch (error) {
        alert(error);
      }
      base.auth().onAuthStateChanged((user) => {
        if (user)
          user.updateProfile({
            displayName: name.value,
          });
      });
    },

    [history]
  );
  return (
    <div>
      <form onSubmit={handelSingUp}>
        <label>
          email
          <input name="email" placeholder="email" type="email"></input>
        </label>
        <hr />
        <label>
          password
          <input name="password" placeholder="password" type="password"></input>
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
