import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedHeader extends Component {
  handleLogout = async event => {
    event.preventDefault();
    console.log("LOGOUT form submitted");
    let data = new FormData();
    await fetch("/logout", {
      method: "POST",
      body: data,
      credentials: "include"
    });
  };
  render = () => {
    return (
      <div class="navbar">
        <Link to="/AddSport">Add event</Link>
        <div class="dropdown">
          <div class="dropdown-content">
            <button className="headerforms" onClick={this.handleLogout}>
              {" "}
              Log out{" "}
            </button>
            <Link to="/MontrealMaps">Montreal Maps</Link>
            <Link to="/TorontoMaps">Toronto Maps</Link>
            <Link to="/AddUsers">Add user</Link>
            <Link to="/GamesBody">Game</Link>
            <Link to="/Calendar">Calendar</Link>
          </div>
        </div>
      </div>
    );
  };
}
let Header = connect()(UnconnectedHeader);
export default Header;
