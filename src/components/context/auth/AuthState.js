import { useReducer, useContext } from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../../../utils/setAuthToken";
import AlertContext from "../../context/alert/AlertContext";

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
  const initialState = {
    user: null,
    error: null,
    loading: false,
    isAuthenticated: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.msg });
      setAlert(error.response.data.msg, "danger");
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
      setAlert(error.response.data.msg, "danger");
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
      setAlert(error.response.data.msg, "danger");
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loadUser,
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
