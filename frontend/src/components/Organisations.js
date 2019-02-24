import React, { Component } from "react";
import Shifts from "./Shifts";

export class Organisations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hourlyRate: "",
      editing: false,
      viewShifts: false
    };
  }

  displayOrganisations = () => {
    var organisations = this.props.organisations;
    var organisation = organisations.map(organisation => (
      <li key={organisation.id}>
        {organisation.name}
        <button
          onClick={() =>
            this.joinOrganisation(organisation.id, organisation.name)
          }
          style={{ margin: "5px" }}
        >
          Join
        </button>
      </li>
    ));
    return <ul>{organisation}</ul>;
  };

  joinOrganisation = (organisationId, organisationName) => {
    var data = {
      organisationId: organisationId
    };
    fetch("/organisations/join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.props.sessionId
      },
      body: JSON.stringify(data)
    }).then(res => {
      this.props.getData(this.props.sessionId);
    });
    this.setState({ organisationName: organisationName });
  };

  createOrganisation = e => {
    e.preventDefault();
    var data = {
      name: this.state.name,
      hourlyRate: this.state.hourlyRate
    };

    fetch("/organisations/create_join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.props.sessionId
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        this.props.getData(this.props.sessionId);
      })
      .catch(res => {
        console.log(res);
      });
  };

  leaveOrganisation = () => {
    fetch("/organisations/leave", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.props.sessionId
      }
    }).then(res => {
      this.props.getData(this.props.sessionId);
    });
    this.setState({ editing: false });
  };

  editOrganisation = e => {
    e.preventDefault();
    var data = {
      name: this.state.name,
      hourlyRate: this.state.hourlyRate
    };

    fetch(
      "/organisations/" + this.props.userAttributes.organisationId.toString(),
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.props.sessionId
        },
        body: JSON.stringify(data)
      }
    )
      .then(res => {
        this.props.getData(this.props.sessionId);
      })
      .catch(res => {
        console.log(res);
      });
    // update dom
    this.setState({
      organisationName: data.name,
      editing: false
    });
  };

  handleTextInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    if (this.props.userAttributes.organisationId === null) {
      return (
        <div className="body-content">
          {this.props.userAttributes.organisationId ? (
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
            onSubmit={this.createOrganisation}
          >
            <h2>Create Organisation</h2>
            <br />
            Name:
            <input
              type="text"
              id="name"
              name="name"
              required={true}
              value={this.state.name}
              onChange={this.handleTextInput}
            />
            <br />
            <br />
            Hourly Rate: $
            <input
              type="number"
              name="hourlyRate"
              required={true}
              value={this.state.hourlyRate}
              onChange={this.handleTextInput}
            />
            <br />
            <input type="submit" value="Create and Join" />
          </form>
        </div>
      );
    } else {
      if (this.state.editing) {
        return (
          <center>
            <div>
              <h2>Edit {this.state.organisationName}</h2>
              <form
                action={"/organisations/" + this.state.organisationId}
                method="PUT"
                onSubmit={this.editOrganisation}
              >
                <br />
                Name:{" "}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleTextInput}
                />
                <br />
                <br />
                Hourly Rate: $
                <input
                  type="number"
                  name="hourlyRate"
                  value={this.state.hourlyRate}
                  onChange={this.handleTextInput}
                />
                <input type="submit" value="Update" />
                <br />
                <button onClick={this.leaveOrganisation} type="button">
                  Leave
                </button>
              </form>
            </div>
          </center>
        );
      } else {
        return (
          <center>
            <div>
              <h2>
                Summary{" "}
                {this.state.organisationName ? (
                  <span>of {this.state.organisationName}</span>
                ) : (
                  <span />
                )}
              </h2>
              <br />
              <button onClick={this.props.toggleShift}>View Shifts</button>
              <button onClick={() => this.setState({ editing: true })}>
                Edit
              </button>
              <button onClick={this.leaveOrganisation}>Leave</button>
            </div>
          </center>
        );
      }
    }
  }
}

export default Organisations;
