import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePost from "./postReducer";
import detailPost from "./detailPostReducer";
import discover from './discoverReducer';
import suggestions from './suggestionReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  homePost,
  detailPost,
  discover,
  suggestions,
  socket,
  notify,
  message
});
