import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import Header from "./Header.jsx";
import LoginOrSignup from "./LoginOrSignup.jsx"
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
import Homepage from "./Homepage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    if (this.props.loggedIn) {
      return (
        <Fragment>
          <Header username={this.props.username} />
          <Switch>
            <Route exact path="/"                   render={() => <Homepage/>}/>
            <Route exact path="/MontrealMaps"       render={() => <MontrealMaps/>}/>
            <Route exact path="/AddSport"           render={() => <AddSport/>}/>
            <Route exact path="/ratingsystem"       render={() => <RatingSystem/>}/>
            <Route exact path="/TorontoMaps"        render={() => <TorontoMaps/>}/>
            <Route exact path="/AddUsersBasketball" render={() => <AddUsersBasketball/>}/>
            <Route exact path="/GamesBody"          render={() => <GamesBody/>}/>
            <Route exact path="/Calendar"           render={() => <Calendar/>}/>
            <Route exact path="/AddUsersHockey"     render={() => <AddUsersHockey/>}/>
            <Route exact path="/AddUsersFootball"   render={() => <AddUsersFootball/>}/>
            <Route exact path="/AddUsersBaseball"   render={() => <AddUsersBaseball/>}/>
          </Switch>
        </Fragment>
      );
    } else {
      return <LoginOrSignup isLoginNotSignup={true}/>
    }
  }
}

const mapStateToProps = state => _.pick(state, ["username", "loggedIn"]);
App = connect(mapStateToProps)(App)
export default App;
