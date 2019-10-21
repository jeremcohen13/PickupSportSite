import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

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
    return <Redirect to="/Login" />;
  };

  render = () => {
    return (
      <div className="header">
        <nav>
          <ul>
            <li>
              <Link to="/GamesBody">
                <img src="../uploads/logo.png" height="100px" />
              </Link>
            </li>
            <li>
              <Link className="a" to="/GamesBody">
                Games
              </Link>
            </li>
            <li>
              <Link className="a" to="/AddSport">
                {" "}
                Add Sport{" "}
              </Link>
            </li>
            <li>
              <Link className="a" to="/MontrealMaps">
                {" "}
                Montreal Parks{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
}
let Header = connect()(UnconnectedHeader);
export default Header;
