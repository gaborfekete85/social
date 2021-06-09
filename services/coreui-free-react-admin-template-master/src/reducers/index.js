import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import restaurants from "./restaurants";
import functions from "./functions";
import services from "./services";
import globals from "./global";

export default combineReducers({
  auth,
  message,
  restaurants,
  functions,
  services, 
  globals
});
