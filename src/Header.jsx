import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let Header = () => {
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
              Add Sport
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Header = connect()(Header);
export default Header;
