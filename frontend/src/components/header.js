import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <div className="header">
        <a href="./">
          <h1>Adnat</h1>
        </a>
        <p>Logged in as John Smith</p>
        {/* if no organisation */}
        <p>
          You aren't a member of any organisations. Join an existing one or
          create a new one.
        </p>
        <a href="#">Log Out</a>
      </div>
    );
  }
}

export default Header;
