import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";

const PrivateRoute = ({ component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <>
            {component.map((SingleComponent, i) => (
              <SingleComponent
                key={`layout-${i}`}
                {...routeProps}
              ></SingleComponent>
            ))}
          </>
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};
export default PrivateRoute;
