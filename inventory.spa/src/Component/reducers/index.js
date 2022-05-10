import { combineReducers } from "redux";
import auth from "./auth";
import {postsReducer} from "./posts";
import message from "./message";
export default combineReducers({
  auth,
  message,
  posts:postsReducer
});