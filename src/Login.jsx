import React, { Component, Fragments } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { postData, loginApiUrl } from "./requestUtils.js";
import { LOGIN } from "./store.js";

class Login extends Component {
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
    const response = await postData({url: loginApiUrl, data});

    if (response.success) {
      this.props.dispatch({
        type: LOGIN,
        username: this.state.username
      });
      this.props.history.push("/");
    } else {
      alert(response.message);
    }
  };

  toSignup = evt => {
    evt.preventDefault();
    this.props.history.push("/signup")
  };

  render = () => {
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text"     onChange={this.onUsernameChange} placeholder="username"></input>
            <input type="password" onChange={this.onPasswordChange} placeholder="password"></input>
            <button onClick={this.formSubmitHandler}>{"login"}</button>
            <p className="message" onClick={this.toSignup}>{"Don't have an account? Sign up"}</p>
          </form>
        </div>
      </div>
    )
  }
}

Login = connect()(Login);
Login = withRouter(Login);
export default Login;
