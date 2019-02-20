import React, { Component } from "react";

export class Organisations extends Component {
  componentDidMount() {
    this.props.getOrganisations();
  }

  displayOrganisations() {
    var organisations = this.props.organisations;
    var organisation = organisations.map(organisation => (
      <li key={organisation.id}>
        {organisation.name}
        {/* <button onClick={() => this.setState({ editing: true })}>Edit</button> */}
        <button
          onClick={() =>
            this.props.joinOrganisation(organisation.id, organisation.name)
          }
        >
          Join
        </button>
      </li>
    ));
    return <ul>{organisation}</ul>;
  }

  render() {
    return (
      <div className="body-content">
        {this.props.organisationId ? (
          <p />
        ) : (
          <p>
            You aren't a member of any organisations. Join an existing one or
            create a new one.
          </p>
        )}

        <br />
        <h2>Organisations</h2>
        {this.displayOrganisations()}

        <form
          action="/organisations/create_join"
          method="post"
          onSubmit={this.props.createOrganisation}
        >
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
