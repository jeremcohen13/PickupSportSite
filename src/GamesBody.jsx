import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { initialData } from "./Data.js";
class UnconnectedGamesBody extends Component {
  render = () => {
    let sportsPaths = {
      basketball: "AddUsersBasketball",
      hockey: "AddUsersHockey",
      football: "AddUsersFootball",
      tennis: "AddUsersTennis"
    };
    console.log(this.props.events);

    return (
      <div className="frontpage">
        <div>
          <h1 alight="centre">Pick a Game!</h1>
          {this.props.events.map(event => {
            let sportPath = sportsPaths[event.sport];
            return (
              <Link to={`/${sportPath}`}>
                <div className="card">
                  <div>
                    <h1>{event.title}</h1>
                  </div>
                  <div>
                    <h2>{event.location}</h2>
                  </div>
                  <div>
                    <h3>{event.date}</h3>
                  </div>
                  <div>
                    <h4>{event.sport}</h4>
                  </div>
                  <div>
                    <h4>{event.amount} people</h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  console.log(state);
  return {
    location: state.location,
    title: state.title,
    date: state.date,
    amount: state.amount,
    events: state.events
  };
};
let GamesBody = connect(mapStateToProps)(UnconnectedGamesBody);
export default GamesBody;
