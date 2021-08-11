import React, { Component } from "react";
import { API_URL } from "../App";
class Login extends Component {
  login = () => {
    // Change location to /login server route while sending a redirect url
    // If user is coming from a page different than /, get the page they
    // are coming from, otherwise redirect to / after login
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const url = `${window.location.protocol}//${window.location.host}${from.pathname}`;
    window.location = `${API_URL}/api/auth/github/?from=${url}`;
  };

  render() {
    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Login;
