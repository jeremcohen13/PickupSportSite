import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { EventEmitter } from "events";
import { throws } from "assert";

class UnconnectedAddUsersHockey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      location: "",
      amountNeeded: "",
      addplayer: "",
      newPlayer: []
    };
  }
  handleactiveusers = event => {
    console.log("who's in the game already", event.target.value);
    this.setState({ players: event.target.value });
  };
  handleadditionalplayers = event => {
    console.log("we need more players", event.target.value);
    this.setState({ morePlayers: event.target.value });
  };
  handleaddplayer = event => {
    event.preventDefault();
    console.log("click to join");
    let data = new FormData(this.player.addplayer);
    let player = this.props.username;
    console.log("player added", player);
    data.append("add", this.state.addplayer);
  };

  render = () => {
    return (
      <div>
        <button className="hockey1" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="hockey2" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="hockey3" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="hockey4" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="hockey5" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="hockey6" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <div>{this.props.username}</div>
        <div>
          <img src="/uploads/rink.jpg" width="900px" />
        </div>
      </div>
    );
  };
}
let AddUsersHockey = connect()(UnconnectedAddUsersHockey);

export default AddUsersHockey;
