import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import Header from "./Header.jsx";
import Homepage from "./Homepage.jsx";
import LoginOrSignup from "./LoginOrSignup.jsx"
import AddSport from "./AddSport.jsx";
import GamesBody from "./GamesBody.jsx";
import SportEvent from "./SportEvent.jsx";
import AddUsersBasketball from "./AddUsersBasketball.jsx";
import AddUsersHockey from "./AddUsersHockey.jsx";
import AddUsersFootball from "./AddUsersFootball.jsx";
import AddUsersBaseball from "./AddUsersBaseball.jsx";

let App = (props) => {
  if (props.loggedIn) {
    return (
      <Fragment>
        <Header username={props.username} />
        <Switch>
          <Route exact path="/"                   component={Homepage}/>
          <Route exact path="/AddSport"           component={AddSport}/>
          <Route exact path="/GamesBody"          component={GamesBody}/>
          <Route exact path="/SportEvent/:id"     component={SportEvent}/>
          <Route exact path="/AddUsersBasketball" component={AddUsersBasketball}/>
          <Route exact path="/AddUsersHockey"     component={AddUsersHockey}/>
          <Route exact path="/AddUsersFootball"   component={AddUsersFootball}/>
          <Route exact path="/AddUsersBaseball"   component={AddUsersBaseball}/>
        </Switch>
      </Fragment>
    );
  } else {
    return <LoginOrSignup isLoginNotSignup={true}/>
  }
};

const mapStateToProps = state => _.pick(state, ["username", "loggedIn"]);
App = connect(mapStateToProps)(App)
export default App;
