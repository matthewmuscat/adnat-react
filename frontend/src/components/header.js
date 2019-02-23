import React, { Component } from "react";

export class Header extends Component {
  // Logout call, then request state change
  logout = () => {
    fetch("http://localhost:3000/auth/logout", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.props.sessionId
      }
    }).then(() => {
      this.props.logout();
    });
  }

  render() {
    // If logged in
    if (this.props.sessionId) {
      return (
        <div className="header">
          <a href="./">
            <h1>Adnat</h1>
          </a>
          <p>Logged in as {this.props.userAttributes.name}</p>
          <button onClick={this.logout}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div className="header">
          <a href="./">
            <h1>Adnat</h1>
          </a>
        </div>
      );
    }
  }
}

export default Header;
