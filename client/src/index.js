import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  devs: [],
  name: "",
  position: "",
  skills: "",
  screen: "add"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NAME":
      return {
        ...state,
        name: action.payload
      };
    case "POSITION":
      return {
        ...state,
        position: action.payload
      };
    case "SKILLS":
      return {
        ...state,
        skills: action.payload
      };
    case "UPDATE_DEVS":
      return {
        ...state,
        devs: action.payload
      };
    case "HANDLE_LINKS":
      return {
        ...state,
        screen: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
