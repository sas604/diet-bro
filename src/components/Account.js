import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import base from "./firebase";
import { format } from "date-fns";

export default function Account() {
  return (
    <div className="wrapper bg-pattern ">
      <button
        className=" btn bg-purple sign-out"
        onClick={() => base.auth().signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
