import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { postData } from "./utils.js"
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"

class LoginOrSignup extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <BrowserRouter>
        <Route exact path="/"       render={() => <Redirect to="/login"/>}/>
        <Route exact path="/login"  render={() => <Login/>}/>
        <Route exact path="/signup" render={() => <Signup/>}/>
      </BrowserRouter>
    )
  }
}

export default LoginOrSignup;
