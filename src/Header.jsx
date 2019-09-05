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
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link className="a" to="/FrontPage">
                Home
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
                Montreal Maps{" "}
              </Link>
            </li>
            <li>
              <Link className="a" to="/TorontoMaps">
                {" "}
                Toronto Maps{" "}
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
