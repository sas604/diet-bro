import React, { useEffect, useState } from "react";
import base from "./components/firebase";
import { format, getTime } from "date-fns";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);
  const [currentUserData, setUserData] = useState({});
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  useEffect(() => {
    base.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  useEffect(() => {
    // database path
    const firebase = base.database().ref("users");
    // check if we have this user in the database if user does't
    //exist set user, else load userData to userData state
    /*current user data
     * colories
     * target
     */
    firebase.on("value", (snapshot) => {
      if (currentUser) {
        if (!snapshot.val() || !snapshot.val()[currentUser.uid]) {
          firebase.update({
            [currentUser.uid]: {
              calories: 0,
              target: 2000,
            },
          });
        } else {
          setUserData(snapshot.val()[currentUser.uid]);
        }
      }
    });
    // close conection to database on rerender
    return () => firebase.off();
  }, [currentUser]);

  // listen for changes to current user data, and update database if there any
  useEffect(() => {
    if (currentUser) {
      const firebase = base.database().ref(`users/${currentUser.uid}`);
      firebase.update(currentUserData);
    }
  }, [currentUserData, currentUser]);

  if (pending) return <h1>Loading...</h1>;
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        data: [currentUserData, setUserData],
        dateContext: [date, setDate],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};