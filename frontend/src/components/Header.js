import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { logout } from "../utils/api";

export class Header extends Component {
  // Logout call, then request state change
  requestLogout = () => {
    logout().then(() => {
      this.props.logout();
    });
  };

  render() {
    // If logged in
    if (this.props.sessionId) {
      return (
        <div className="header">
          <h1 style={{ color: "#57baed" }}>Adnat</h1>
          <p>Logged in as {this.props.userAttributes.name}</p>
          <button onClick={this.requestLogout}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div className="header">
          <h1 style={{ color: "#57baed" }}>Adnat</h1>
        </div>
      );
    }
  }
}

export default Header;
