import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
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

Header = connect()(Header);
export default Header;
