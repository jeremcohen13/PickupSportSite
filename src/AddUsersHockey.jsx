import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import "./AddUsersHockey.css";

class AddUsersHockey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        positions: {
          hockey1: undefined,
          hockey2: undefined,
          hockey3: undefined,
          hockey4: undefined,
          hockey5: undefined,
          hockey6: undefined,
          hockey7: undefined,
          hockey8: undefined,
          hockey9: undefined,
          hockey10: undefined
        }
      }
    };
  }

  handleAddPlayer = position => {
    return event => {
      event.preventDefault();
      console.log("click to join");
      let player = this.props.username;
      console.log("player added", player);

      let newPositions = {
        ...this.state.event.positions,
        [position]: this.props.username
      };

      this.setState({ event: { ...event, positions: newPositions } });
    };
  };

  // event.positions= [{title,player}]

  render = () => {
    console.log("this.state.event.positions", this.state.event.positions);

    return (
      <div>
        <div className="hockey-container">
          {_toPairs(this.state.event.positions).map(([position, player]) => {
            return (
              <div>
                <button
                  className={position}
                  onClick={this.handleAddPlayer(position)}
                >
                  {player ? player : "Add Player"}
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <img src="/uploads/rink.jpg" width="900px" />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => _.pick(state, ["username", "addplayer"])
AddUsersHockey = connect(mapStateToProps)(AddUsersHockey);
export default AddUsersHockey;
