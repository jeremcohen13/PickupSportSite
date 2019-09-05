import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { initialData } from "./Data.js";
class UnconnectedPublicCourt extends Component {
  render = () => {
    return (
      <div className="frontpage">
        <div>
          {this.props.events.map(event => {
            return (
              <div className="card">
                <div>{event.title}</div>
                <div>{event.location}</div>
                <div>{event.amount}</div>
                <div>{event.date}</div>
                <div>{event.sport}</div>
              </div>
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
let PublicCourt = connect(mapStateToProps)(UnconnectedPublicCourt);
export default PublicCourt;
