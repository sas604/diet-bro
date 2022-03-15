import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { authFireBase } from './components/firebase';
export const AuthContext = React.createContext();
const auth = authFireBase;
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
