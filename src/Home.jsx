import React, { Component } from "react";
import Header from "./Header.jsx";
import { connect } from "react-redux";

class Home extends Component {
  render = () => {
    return (
      <div>
        <Header username={this.props.username} />
      </div>
    );
  };
}

export default Home;
