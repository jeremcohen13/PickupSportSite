import React, { Component } from "react";
import Header from "./Header.jsx";
import MontrealMaps from "./MontrealMaps.jsx";
import AddSport from "./AddSport.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import RatingSystem from "./ratingsystem.jsx";
import TorontoMaps from "./TorontoMaps.jsx";
import AddUsersBasketball from "./AddUsersBasketball.jsx";
import Calendar from "./Calendar.jsx";
import AddUsersHockey from "./AddUsersHockey.jsx";
import GamesBody from "./GamesBody.jsx";
import { connect } from "react-redux";
import AddUsersFootball from "./AddUsersFootball.jsx";
import AddUsersBaseball from "./AddUsersBaseball.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: "",
      setusername: "",
      setpwd: "",
      signuptoggle: false
    };
  }
  // renderSport = routerData => {
  //   let eventID = routerData.math.params.id;
  //   console.log(eventID);
  // };
  usernameChange = evt => {
    console.log("login username:", evt.target.value);
    this.setState({ usernameInput: evt.target.value });
  };
  passwordChange = evt => {
    console.log("login pwd:", evt.target.value);
    this.setState({ passwordInput: evt.target.value });
  };
  submitloginHandler = async evt => {
    evt.preventDefault();
    console.log("username", this.state.usernameInput);
    console.log("password", this.state.passwordInput);
    let name = this.state.usernameInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    console.log("/login response", body);
    body = JSON.parse(body);
    if (body.success) {
      this.props.dispatch({
        type: "login-success",
        username: this.state.usernameInput
      });
    }
  };

  usernameSet = evt => {
    console.log("set username:", evt.target.value, this.state);
    this.setState({ setusername: evt.target.value });
  };
  passwordSet = evt => {
    console.log("set password:", evt.target.value);
    this.setState({ setpwd: evt.target.value });
  };
  submitsignupHandler = async evt => {
    evt.preventDefault();
    console.log("set username", this.state.setusername);
    console.log("set password", this.state.setpwd);
    let username = this.state.setusername;
    let password = this.state.setpwd;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    console.log("/signup response", body);
    body = JSON.parse(body);
    if (body.success) {
      this.props.dispatch({
        type: "login-success",
        username: this.state.setusername
      });
    }
  };
  signuptoggle = () => {
    this.setState({ signuptoggle: !this.state.signuptoggle });
  };
  render = () => {
    console.log(`loggedIn: ${this.props.loggedIn}, signuptoggle: ${this.state.signuptoggle}`)
    if (!this.props.loggedIn) {
      if (this.state.signuptoggle === false) { // trying to sign up
        return (
          <div className="login-page">
            <div className="form">
              <form className="register-form">
                <input
                  type="text"
                  onChange={this.usernameSet}
                  placeholder="Create username"
                />
                <input
                  type="password"
                  onChange={this.passwordSet}
                  placeholder="Create password"
                />
                <button onClick={this.submitsignupHandler}>create</button>
                <p>Already registered?</p>
                <p className="message" onClick={this.signuptoggle}>
                  Sign in
                </p>
              </form>
            </div>
          </div>
        );
      } else { // trying to log in
        return (
          <div className="login-page">
            <div className="form">
              <form className="login-form">
                <input
                  type="text"
                  onChange={this.usernameChange}
                  placeholder="username"
                />
                <input
                  type="text"
                  onChange={this.passwordChange}
                  placeholder="password"
                />
                <button onClick={this.submitloginHandler}>login</button>
                <p>Not registered? </p>
                <p className="message" onClick={this.signuptoggle}>
                  Create an account{" "}
                </p>
              </form>
            </div>
          </div>
        );
      }
    } else { // logged in
      return (
        <BrowserRouter>
          <Header username={this.props.username} />
          <Route
            exact={true}
            path="/MontrealMaps"
            render={() => <MontrealMaps />}
          />
          <Route exact={true} path="/AddSport" render={() => <AddSport />} />
          <Route
            exact={true}
            path="/ratingsystem"
            render={() => <RatingSystem />}
          />
          <Route
            exact={true}
            path="/TorontoMaps"
            render={() => <TorontoMaps />}
          />
          <Route
            exact={true}
            path="/AddUsersBasketball"
            render={() => <AddUsersBasketball />}
          />
          <Route exact={true} path="/GamesBody" render={() => <GamesBody />} />
          <Route exact={true} path="/Calendar" render={() => <Calendar />} />
          <Route
            exact={true}
            path="/AddUsersHockey"
            render={() => <AddUsersHockey />}
          />
          <Route
            exact={true}
            path="/AddUsersFootball"
            render={() => <AddUsersFootball />}
          />
          <Route
            exact={true}
            path="/AddUsersBaseball"
            render={() => <AddUsersBaseball />}
          />
        </BrowserRouter>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.loggedIn,
    username: state.username
  };
};

export default connect(mapStateToProps)(App);
