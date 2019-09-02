import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { EventEmitter } from "events";
import { throws } from "assert";

class UnconnectedAddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      location: "",
      amountNeeded: "",
      morePlayers: "",
      newPlayer: []
    };
  }
  handletime = event => {
    console.log("time of event", event.target.value);
    this.setState({ time: event.target.value });
  };
  handlelocation = event => {
    console.log("where is the game", event.target.value);
    this.setState({ location: event.target.value });
  };
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
    let data = new FormData(this.player.morePlayers);
    data.append();
  };
  render = () => {
    return (
      <div>
        <button className="Addplayer1" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="Addplayer2" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="Addplayer3" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="Addplayer4" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <button className="Addplayer5" onClick={this.handleaddplayer}>
          Add Player
        </button>
        <div>{this.props.username}</div>
        <div>
          <img src="/uploads/court.jpg" width="900px" />
        </div>
      </div>
    );
  };
}
let AddUsers = connect()(UnconnectedAddUsers);

export default AddUsers;
