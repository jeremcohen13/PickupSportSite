import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { EventEmitter } from "events";
import { throws } from "assert";

class UnconnectedAddUsersBaseball extends Component {
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

  render = () => {
    console.log("this.state.event.positions", this.state.event.positions);

    return (
      <div>
        <div className="hockey-container">
          {Object.keys(this.state.event.positions).map(position => {
            let player = this.state.event.positions[position];
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
          <img src="/uploads/baseball.jpg" width="900px" />
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  console.log(state);
  return {
    username: state.username,
    player: state.username,
    addplayer: state.addplayer
  };
};

let AddUsersBaseball = connect(mapStateToProps)(UnconnectedAddUsersBaseball);

export default AddUsersBaseball;
