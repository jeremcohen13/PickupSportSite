import React, { Component, Fragments } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header.jsx";
import MontrealMaps from "./MontrealMaps.jsx";
import AddSport from "./AddSport.jsx";
import RatingSystem from "./ratingsystem.jsx";
import TorontoMaps from "./TorontoMaps.jsx";
import AddUsersBasketball from "./AddUsersBasketball.jsx";
import Calendar from "./Calendar.jsx";
import AddUsersHockey from "./AddUsersHockey.jsx";
import GamesBody from "./GamesBody.jsx";
import AddUsersFootball from "./AddUsersFootball.jsx";
import AddUsersBaseball from "./AddUsersBaseball.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginNOTsignup: false // default to sig up, not login
    };
  }

  usernameSet = evt => {
    const username = evt.target.value;
    console.log(`existing username: ${this.state.username}, new username: ${username}`);
    this.setState({ username });
  };
  passwordSet = evt => {
    const password = evt.target.value;
    console.log(`existing password: ${this.state.password}, new password: ${password}`);
    this.setState({ password });
  };

  formSubmitHandler = async evt => {
    evt.preventDefault();
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);

    const path = this.state.loginNOTsignup ? "/login" : "/signup";
    const body = await (await fetch(path, { method: "POST", body: data })).json();
    console.log(`${path} response: ${JSON.stringify(body)}`);

    if (body.success) {
      this.props.dispatch({
        type: "login-success",
        username: this.state.username
      });
    }
  };

  toggle_loginNOTsignup = () => {
    this.setState({ loginNOTsignup: !this.state.loginNOTsignup });
  };

  render = () => {
    if (this.props.loggedIn) {
      return (
        <div>
          <BrowserRouter>
            <Header username={this.props.username} />
            <Route exact={true} path="/MontrealMaps"       render={() => <MontrealMaps/>}/>
            <Route exact={true} path="/AddSport"           render={() => <AddSport/>}/>
            <Route exact={true} path="/ratingsystem"       render={() => <RatingSystem/>}/>
            <Route exact={true} path="/TorontoMaps"        render={() => <TorontoMaps/>}/>
            <Route exact={true} path="/AddUsersBasketball" render={() => <AddUsersBasketball/>}/>
            <Route exact={true} path="/GamesBody"          render={() => <GamesBody/>}/>
            <Route exact={true} path="/Calendar"           render={() => <Calendar/>}/>
            <Route exact={true} path="/AddUsersHockey"     render={() => <AddUsersHockey/>}/>
            <Route exact={true} path="/AddUsersFootball"   render={() => <AddUsersFootball/>}/>
            <Route exact={true} path="/AddUsersBaseball"   render={() => <AddUsersBaseball/>}/>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div className="login-page">
          <div className="form">
            <form className={this.state.loginNOTsignup ? "login-form" : "register-form"}>
              <input
                type="text"
                onChange={this.usernameSet}
                placeholder={this.state.loginNOTsignup ? "username" : "create username"}>
              </input>
              <input
                type="password"
                onChange={this.passwordSet}
                placeholder={this.state.loginNOTsignup ? "password" : "create password"}>
              </input>
              <button onClick={this.formSubmitHandler}>
                {this.state.loginNOTsignup ? "login" : "sign up"}
              </button>
              <p className="message" onClick={this.toggle_loginNOTsignup}>
                {this.state.loginNOTsignup ? "don't yet an account?" : "already have an account?"}
              </p>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  username: state.username
});
export default connect(mapStateToProps)(App);
