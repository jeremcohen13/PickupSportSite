import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"

class LoginOrSignup extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Fragment>
        <Route exact path="/login"  render={() => <Login/>}/>
        <Route exact path="/signup" render={() => <Signup/>}/>
        <Route       path="/"       render={() => <Redirect to="/login"/>}/>
      </Fragment>
    )
  }
}

export default LoginOrSignup;
