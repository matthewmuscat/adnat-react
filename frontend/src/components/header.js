import React, { Component } from "react";

export class Header extends Component {
  render() {
    const loggedIn = this.props.loggedIn;

    if (loggedIn) {
      return (
        <div className="header">
          <a href="./">
            <h1>Adnat</h1>
          </a>
          <p>Logged in as {this.props.getName}</p>

          <a onClick={this.props.requestLogout} href="#">
            Log Out
          </a>
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
