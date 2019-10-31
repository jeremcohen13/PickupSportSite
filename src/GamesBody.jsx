import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { initialData } from "./Data.js";

class GamesBody extends Component {
  constructor(props) {
    super(props);
  }

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

let mapStateToProps = state => _.pick(state, [
  "location", "title", "date", "amount", "events"
]);
GamesBody = connect(mapStateToProps)(GamesBody);
export default GamesBody;
