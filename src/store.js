import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, username: action.username };
  }
  if (action.type === "logout-success") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "add-event") {
    console.log(state);
    return { ...state, events: state.events.concat(action.event) };
  }
  if (action.type === "add-player") {
    console.log(state);
    return { ...state, player: state.p };
  }
  if (action.type === "select-location") {
    return { ...state, location: action.value };
  }

  if (action.type === "select-amount") {
    return { ...state, amount: action.value };
  }
  if (action.type === "select-sport") {
    return { ...state, sport: action.value };
  }
  if (action.type === "select-date") {
    return { ...state, date: action.value };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    username: "",
    location: [],
    date: [],
    amount: [],
    title: "",
    events: [],
    player: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
