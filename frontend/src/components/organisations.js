import React, { Component } from "react";

export class Organisations extends Component {
  render() {
    return (
      <div className="body-content">
        {/* if not registered */}
        <p>
          You aren't a member of any organisations. Join an existing one or
          create a new one.
        </p>
        <br />
        <h2>Organisations</h2>
        <ul>
          <li>Bob's Burgers</li>
          <li>Moe's Tavern</li>
          <li>Sally's Sandwiches</li>
        </ul>
        <form>
          <h2>Create Organisation</h2>
          <br />
          Name <input type="text" name="name" />
          <br />
          Hourly rate: $<input type="text" name="rate" />
          <br />
          <input type="submit" value="Create and Join" />
        </form>
      </div>
    );
  }
}

export default Organisations;
