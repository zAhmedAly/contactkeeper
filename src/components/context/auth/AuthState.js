import { useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import AlertContext from "../alert/AlertContext";

import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../types";

const AuthState = (props) => {
  const usersData = [
    {
      id: uuidv4(),
      name: "Ahmed Aly",
      email: "ahmed@gmail.com",
      password: "123456",
    },
    {
      id: uuidv4(),
      name: "Edward Yue",
      email: "edward@gmail.com",
      password: "123456",
    },
    {
      id: uuidv4(),
      name: "Reham Kassem",
      email: "reham@gmail.com",
      password: "123456",
    },
    {
      id: uuidv4(),
      name: "Habiba Aly",
      email: "habiba@gmail.com",
      password: "123456",
    },
  ];

  const initialState = {
    users: usersData,
    user: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const login = (email, password) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const userExists = usersData.filter(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      setTimeout(() => {
        if (userExists) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { email, password },
          });
        } else {
          dispatch({ type: LOGIN_FAIL });
          setAlert("Invalid email or password", "danger");
        }
      }, 1000);
    } catch (error) {
      dispatch({ type: LOGIN_FAIL });
    }
  };

  const register = (registerData) => {
    console.log("AuthState Register registerData = ", registerData);

    dispatch({ type: REGISTER_REQUEST });
    try {
      console.log("AuthState Register usersData = ", usersData);

      const userExists = usersData.filter(
        (user) => user.email.toLowerCase() === registerData.email.toLowerCase()
      );
      console.log("AuthState Register userExists = ", userExists);
      setTimeout(() => {
        if (userExists.length === 0) {
          registerData.id = uuidv4();
          console.log("AuthState Register SAVEregisterData = ", registerData);
          dispatch({
            type: REGISTER_SUCCESS,
            payload: registerData,
          });
          setAlert("User Regiserted Successfully", "success");
        } else {
          dispatch({ type: REGISTER_FAIL });
          setAlert("User already exists", "danger");
        }
      }, 1000);
    } catch (error) {
      dispatch({ type: REGISTER_FAIL });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users: state.users,
        user: state.user,
        error: state.error,
        loading: state.loading,
        login,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
