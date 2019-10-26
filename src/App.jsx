import React, { Component, Fragments } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

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

class App extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    if (this.props.loggedIn) {
      return (
        <div>
          <BrowserRouter>
            <Header username={this.props.username} />
            <Route exact={true} path="/MontrealMaps"       render={() => <MontrealMaps/>}/>
            <Route exact={true} path="/AddSport"           render={() => <AddSport />} />
            <Route exact={true} path="/ratingsystem"       render={() => <RatingSystem />} />
            <Route exact={true} path="/TorontoMaps"        render={() => <TorontoMaps />} />
            <Route exact={true} path="/AddUsersBasketball" render={() => <AddUsersBasketball />} />
            <Route exact={true} path="/GamesBody"          render={() => <GamesBody />} />
            <Route exact={true} path="/Calendar"           render={() => <Calendar />} />
            <Route exact={true} path="/AddUsersHockey"     render={() => <AddUsersHockey />} />
            <Route exact={true} path="/AddUsersFootball"   render={() => <AddUsersFootball />} />
            <Route exact={true} path="/AddUsersBaseball"   render={() => <AddUsersBaseball />} />
          </BrowserRouter>
        </div>
      );
    } else {
      return <LoginOrSignup isLoginNotSignup={true}/>
    }
  }
}

const mapStateToProps = state => ({
  username: state.username,
  loggedIn: state.loggedIn,
})
App = connect(mapStateToProps)(App)
export default App;
