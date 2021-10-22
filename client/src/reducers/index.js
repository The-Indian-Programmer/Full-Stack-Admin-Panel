import user from "./userAuth";
import loader from "./globalReducer";
import alert from "./alertReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user,
  loader,
  alert,
});

export default rootReducer;
