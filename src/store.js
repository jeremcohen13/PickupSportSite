import { createStore } from "redux";

const LOGIN           = "LOGIN";
const LOGOUT          = "LOGOUT";
const ADD_EVENT       = "ADD-EVENT";
const ADD_PARTICIPANT = "ADD-PLAYER";
const SELECT_LOCATION = "SELECT-LOCATION";
const SELECT_AMOUNT   = "SELECT-AMOUNT";
const SELECT_SPORT    = "SELECT-SPORT";
const SELECT_DATE     = "SELECT-DATE";

let reducer = (state, action) => {
  if (action.type === LOGIN) {
    return { ...state, loggedIn: true, username: action.username };
  }
  else if (action.type === LOGOUT) {
    return { ...state, loggedIn: false };
  }

  else if (action.type === ADD_EVENT) {
    console.log(state);
    return { ...state, events: [...state.events, action.event] };
  }
  else if (action.type === ADD_PARTICIPANT) {
    console.log(state);
    return { ...state, player: state.p };
  }

  else if (action.type === SELECT_LOCATION) {
    return { ...state, location: action.value };
  }
  else if (action.type === SELECT_AMOUNT) {
    return { ...state, amount: action.value };
  }
  else if (action.type === SELECT_SPORT) {
    return { ...state, sport: action.value };
  }
  else if (action.type === SELECT_DATE) {
    return { ...state, date: action.value };
  }

  else {
    return state;
  }
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

export {
  LOGIN, LOGOUT,
  ADD_EVENT, ADD_PARTICIPANT,
  SELECT_LOCATION, SELECT_AMOUNT, SELECT_SPORT, SELECT_DATE
};
export default store;
