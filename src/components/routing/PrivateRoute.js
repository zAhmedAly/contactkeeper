import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  console.log("PrivateRoute ...rest = ", { ...rest });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     !isAuthenticated && !loading ? (
    //       <Redirect to="/login" />
    //     ) : (
    //       <Component {...props} />
    //     )
    //   }
    // />
  );
};

export default PrivateRoute;
