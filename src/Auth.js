import React, { useEffect, useState } from "react";
import base from "./components/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const updateName = (name) =>
    base.auth().currentUser.updateProfile({ displayName: name });
  const [currentUser, setCurrentUser] = useState();
  const unsubcribe = base.auth().onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  return (
    <AuthContext.Provider
      value={{
        updateName,
        currentUser,
        setCurrentUser,
        unsubcribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
