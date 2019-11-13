import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"

class LoginOrSignup extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <BrowserRouter>
        <Route exact path="/login"  render={() => <Login/>}/>
        <Route exact path="/signup" render={() => <Signup/>}/>
        <Route       path="/"       render={() => <Redirect to="/login"/>}/>
      </BrowserRouter>
    )
  }
}

export default LoginOrSignup;
