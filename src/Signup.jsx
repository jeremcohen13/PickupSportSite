import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postData, signupApiUrl } from "./requestUtils.js";
import { LOGIN } from "./store.js";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  onUsernameChange = evt => { this.setState({ username: evt.target.value }) };
  onPasswordChange = evt => { this.setState({ password: evt.target.value }) };

  formSubmitHandler = async evt => {
    evt.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const response = await postData({url: signupApiUrl, data});

    if (response.success) {
      this.props.dispatch({
        type: LOGIN,
        username: this.state.username,
        userId: response.userId
      });
      this.props.history.push("/");
    } else {
      alert(response.message);
    }
  };

  toLogin = evt => {
    evt.preventDefault();
    this.props.history.push("/login")
  };

  render = () => {
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text"     onChange={this.onUsernameChange} placeholder="username"></input>
            <input type="password" onChange={this.onPasswordChange} placeholder="password"></input>
            <button onClick={this.formSubmitHandler}>{"sign up"}</button>
            <p className="message" onClick={this.toLogin}>{"Already have an account? Login"}</p>
          </form>
        </div>
      </div>
    )
  }
}

const mapPropsToState = ({ loggedIn }) => ({ loggedIn });
Signup = connect(mapPropsToState)(Signup);
Signup = withRouter(Signup);
export default Signup;
