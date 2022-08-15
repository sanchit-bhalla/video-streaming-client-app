import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});
