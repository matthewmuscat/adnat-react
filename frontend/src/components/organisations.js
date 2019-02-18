import React, { Component } from "react";

export class Organisations extends Component {
  render() {
    return (
      <div className="body-content">
        {/* { if no organisations} */}
        <p>
          You aren't a member of any organisations. Join an existing one or
          create a new one.
        </p>
        <br />
        <h2>Organisations</h2>
        <ul>
          {/* loop li's */}
          <p onLoad={this.props.getOrganisations}></p>
          <li>Bob's Burgers</li>
          <li>Moe's Tavern</li>
          <li>Sally's Sandwiches</li>
        </ul>
        <form action="/organisations/create_join"
            method="post"
            onSubmit={this.props.createOrganisation}>
          <h2>Create Organisation</h2>
          <br />
          Name <input type="text" id="name" name="name" />
          <br />
          Hourly rate: $<input type="number" name="hourlyRate" />
          <br />
          <input type="submit" value="Create and Join" />
        </form>
      </div>
    );
  }
}

export default Organisations;
