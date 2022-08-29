import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import loggingMiddleware from "redux-logger";
import studentReducer from "./students";
import campusReducer from "./campuses";

const reducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer,
});

function configureStore() {
  return createStore(reducer, applyMiddleware(thunk, loggingMiddleware));
}

export default configureStore();
