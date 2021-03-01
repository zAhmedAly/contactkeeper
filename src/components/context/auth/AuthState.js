import { useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../../../utils/setAuthToken";

import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADED,
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
    isAuthenticated: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const login = async (loginData) => {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", loginData, config);

      setTimeout(() => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        loadUser();
      }, 1000);
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  const register = async (registerData) => {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", registerData, config);

      setTimeout(() => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        loadUser();
      }, 1000);
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        users: state.users,
        user: state.user,
        error: state.error,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        login,
        register,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
