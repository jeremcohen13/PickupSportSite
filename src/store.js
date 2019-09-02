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
};
const store = createStore(
  reducer,
  {
    loggedIn: false,
    username: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
