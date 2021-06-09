import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import { ACCESS_TOKEN } from '../constants';
import AuthService from "../services/auth.service";
import { getCurrentUser } from '../util/APIUtils';

export const loadUser = () => (dispatch) => {
  getCurrentUser()
  .then(response => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response,
        token: localStorage.getItem(ACCESS_TOKEN)
      }
    });
  }).catch(error => {
    console.log("Error while querying the user ... ");
  });
  console.log("LOGOUT");
};

export const register = (firstName, lastName, email, password) => (dispatch) => {
  console.log('REGISTER invoked');

  return AuthService.register(firstName, lastName, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        "payload": data,
      });
      console.log("LOGIN SUCEEDED");
      return Promise.resolve();
    },
    (error) => {
      console.log("LOGIN FAILED");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
          
      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  console.log("LOGOUT");
  dispatch({
    type: LOGOUT,
  });
};
