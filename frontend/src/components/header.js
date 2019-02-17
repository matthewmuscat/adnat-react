import React, { Component } from "react";

export class Header extends Component {
  render() {
    const sessionId = this.props.sessionId;

    if (sessionId) {
      console.log('if');
      return (
        <div className="header">
          <a href="./">
            <h1>Adnat</h1>
          </a>
          <p>Logged in as {this.props.getName()}</p>
          <a onClick={this.props.requestLogout} href="#">
            Log Out
          </a>
        </div>
      );
    } else {
      console.log('else');
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
