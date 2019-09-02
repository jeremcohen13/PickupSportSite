import React, { Component } from "react";
import Frontpage from "./FrontPage.jsx";
import MontrealMaps from "./MontrealMaps.jsx";
import AddSport from "./AddSport.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import RatingSystem from "./ratingsystem.jsx";
import TorontoMaps from "./TorontoMaps.jsx";
import AddUsers from "./AddUsers.jsx";
import PublicCourt from "./GamesBody.jsx";
import Calendar from "./Calendar.jsx";
class App extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined,
      setusername: "",
      setpwd: "",
      signuptoggle: false
    };
  }
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
      this.setState({ username: name });
    }
    window.fbAsyncInit = function() {
      FB.init({
        appId: "913916335644326",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v4.0"
      });
    };
    async;
    defer;
    crossorigin = "anonymous";
    src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0&appId=913916335644326&autoLogAppEvents=1";
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
    if (!body.success) {
      this.setState({ username: name });
    }
  };
  signuptoggle = () => {
    this.setState({ signuptoggle: !this.state.signuptoggle });
  };
  render = () => {
    console.log(this.state.signuptoggle);
    if (this.state.username === undefined) {
      if (this.state.signuptoggle === false) {
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
                  type="text"
                  onChange={this.passwordSet}
                  placeholder="Create password"
                />
                <button onClick={this.submitsignupHandler}>create</button>
                <p>Already registered?</p>
                <div id="fb-root"></div>
                <script
                  async
                  defer
                  crossorigin="anonymous"
                  src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0&appId=913916335644326&autoLogAppEvents=1"
                ></script>
                <p className="message" onClick={this.signuptoggle}>
                  Sign in
                </p>
                <div
                  class="fb-login-button"
                  data-width=""
                  data-size="small"
                  data-button-type="continue_with"
                  data-auto-logout-link="false"
                  data-use-continue-as="false"
                ></div>
              </form>
            </div>
          </div>
        );
      }
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
    return (
      <BrowserRouter>
        <Frontpage username={this.props.username} />
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
        <Route exact={true} path="/AddUsers" render={() => <AddUsers />} />
        <Route exact={true} path="/GamesBody" render={() => <PublicCourt />} />
        <Route exact={true} path="/Calendar" render={() => <Calendar />} />
      </BrowserRouter>
    );
  };
}
export default App;
