import React, { Component } from "react";

export class Header extends Component {
  render() {
    const sessionId = this.props.sessionId;

    if (sessionId) {
      return (
        <div className="header">
          <a href="./">
            <h1>Adnat</h1>
          </a>
          <p>Logged in as {this.props.getName()}</p>
          <button onClick={this.props.logout}>Log Out</button>
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
