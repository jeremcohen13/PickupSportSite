import { createStore } from "redux";
let reducer = (state, action) => {
  console.log(state);
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, username: action.username };
  }
  if (action.type === "logout-success") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "add-sport") {
    return { ...state, items: state.items.concat(action.item) };
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
    title: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
