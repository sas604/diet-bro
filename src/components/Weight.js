import React, { useContext } from "react";
import { AuthContext } from "../Auth";
export default function Weight() {
  // get current user from context
  const { currentUser, data, dateContext } = useContext(AuthContext);
  return (
    <>
      <h1> Your last recorded weight is</h1>
    </>
  );
}
