import React, { useEffect, useState } from "react";
import base from "./components/firebase";
import { format } from "date-fns";
import Loader from "react-loader-spinner";
import { useTestData } from "./components/hooks";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // const [pending, setPending] = useState(true);
  // const [currentUserData, setUserData] = useState({});
  // const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // const testData = useTestData();

  base.auth().onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  // /// use test data for demo
  // useEffect(() => {
  //   if (currentUser) {
  //     if (currentUser.uid === "ByJmvpz9vOfdXvtl3Ma3lwDW3jo2") {
  //       setUserData(testData);
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [currentUser]);

  // useEffect(() => {
  //   // database path
  //   const firebase = base.database().ref("users");
  //   // check if we have this user in the database if user does't
  //   //exist set user, else load userData to userData state
  //   /*current user data
  //    * colories
  //    * target
  //    */
  //   firebase.on("value", (snapshot) => {
  //     if (currentUser) {
  //       if (!snapshot.val() || !snapshot.val()[currentUser.uid]) {
  //         firebase.update({
  //           [currentUser.uid]: {
  //             target: 2000,
  //             targetWeight: 0,
  //             weight: { [date]: 0 },
  //           },
  //         });
  //       } else {
  //         setUserData(snapshot.val()[currentUser.uid]);
  //       }
  //     }
  //   });
  //   // close conection to database on rerender
  //   return () => firebase.off();
  // }, [currentUser, date]);

  // // listen for changes to current user data, and update database if there any
  // useEffect(() => {
  //   if (currentUser) {
  //     const firebase = base.database().ref(`users/${currentUser.uid}`);
  //     firebase.update(currentUserData);
  //   }
  // }, [currentUserData, currentUser]);
  if (!currentUser) return null;
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
