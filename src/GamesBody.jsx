import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedPublicCourt extends Component {
  render = () => {
    return (
      <div className="frontpage">
        <div>{this.props.title}</div>
        <div>{this.props.location}</div>
        <div>{this.props.time}</div>
        <div>{this.props.amount}</div>
        <Link to="/Gameinfo">Let's Play</Link>
      </div>
    );
  };
}
let PublicCourt = connect()(UnconnectedPublicCourt);
export default PublicCourt;
