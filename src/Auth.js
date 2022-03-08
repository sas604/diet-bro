import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import base from './components/firebase';

export const AuthContext = React.createContext();
const auth = getAuth();
export const AuthProvider = ({ children }) => {
  const updateName = (name) => name;
  //   auth().currentUser.updateProfile({ displayName: name });
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
        updateName,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
