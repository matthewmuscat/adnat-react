import React, { Component } from "react";

// import components
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import Organisations from "./components/organisations";
import Shifts from "./components/shifts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: "",
      name: "",
      userId: "",
      email: "",
      organisationId: "",
      organisationName: "",
      showSignUpComponent: false,
      organisations: [],
      editing: false
    };
    this.requestLogin = this.requestLogin.bind(this);
    this.requestSignup = this.requestSignup.bind(this);
    this.requestLogout = this.requestLogout.bind(this);
    this.getName = this.getName.bind(this);
    this.handleSignUpButton = this.handleSignUpButton.bind(this);
    this.getOrganisations = this.getOrganisations.bind(this);
    this.createOrganisation = this.createOrganisation.bind(this);
    this.joinOrganisation = this.joinOrganisation.bind(this);
    this.leaveOrganisation = this.leaveOrganisation.bind(this);
    this.editOrganisation = this.editOrganisation.bind(this);
  }

  requestLogin(e) {
    e.preventDefault();
    var data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    };

    fetch("http://localhost:3000/auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            sessionId: json.sessionId
          });
        });
      } else {
        console.log("Login Failed");
      }
    });
  }

  requestSignup(e) {
    e.preventDefault();
    var data = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      passwordConfirmation: e.target.elements.passwordConfirmation.value
    };

    fetch("http://localhost:3000/auth/signup/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            sessionId: json.sessionId
          });
        });
      } else {
        console.log("Sign Up Failed");
      }
    });
  }

  requestLogout() {
    fetch("http://localhost:3000/auth/logout", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      }
    }).then(
      this.setState({
        sessionId: "",
        name: "",
        email: "",
        userId: ""
      })
    );
  }

  // get account data
  getName() {
    fetch("http://localhost:3000/users/me/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      }
    }).then(response => {
      response.json().then(json => {
        this.setState({
          name: json.name,
          userId: json.id,
          email: json.email,
          organisationId: json.organisationId
        });
      });
    });
    return this.state.name;
  }

  getOrganisations() {
    fetch("http://localhost:3000/organisations", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      }
    }).then(response => {
      response.json().then(json => {
        this.setState({
          organisations: json
        });
      });
    });
  }

  joinOrganisation(organisationId, organisationName) {
    var data = {
      organisationId: organisationId
    };
    fetch("http://localhost:3000/organisations/join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      },
      body: JSON.stringify(data)
    });
    this.setState({
      organisationName: organisationName
    });
  }

  createOrganisation(e) {
    e.preventDefault();
    var data = {
      name: e.target.elements.name.value,
      hourlyRate: e.target.elements.hourlyRate.value
    };

    fetch("http://localhost:3000/organisations/create_join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      },
      body: JSON.stringify(data)
    });
    this.setState({
      organisationName: data.name
    });
    this.getOrganisations(); // update dom
  }

  leaveOrganisation() {
    fetch("http://localhost:3000/organisations/leave", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      }
    });

    this.setState({
      organisationId: "",
      organisationName: ""
    });
  }

  editOrganisation(e) {
    e.preventDefault();
    var data = {
      // user id
      name: e.target.elements.name.value,
      hourlyRate: e.target.elements.hourlyRate.value
    };

    var fetch =
      "http://localhost:3000/organisations/" +
      this.state.organisationId.toString();
    console.log(fetch);

    fetch("http://localhost:3000/organisations/:id", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      },
      body: JSON.stringify(data)
    });
    // update dom
    this.setState({
      organisationName: data.name,
      editing: false
    });
  }

  getShifts(e) {}

  createShift(e) {
    e.preventDefault();
    var data = {
      // user id
      shiftDate: e.target.elements.shiftDate.value,
      start: e.target.elements.start.value,
      finish: e.target.elements.finish.value,
      breakLength: e.target.elements.hourlyRate.value
    };

    fetch("http://localhost:3000/shifts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      },
      body: JSON.stringify(data)
    });
    this.getShifts(); // update dom
  }

  handleSignUpButton() {
    this.setState(prevState => ({
      showSignUpComponent: !prevState.showSignUpComponent
    }));
  }

  renderSummary() {
    return (
      <center>
        {this.state.editing ? (
          <div>
            <h2>Edit {this.state.organisationName}</h2>
            <form
              action={"/organisations/" + this.state.organisationId}
              method="PUT"
              onSubmit={this.editOrganisation}
            >
              <br />
              Name <input type="text" id="name" name="name" />
              Hourly rate: $<input type="number" name="hourlyRate" />
              <input type="submit" value="Update" />
              <br />
              <button onClick={this.leaveOrganisation} type="button">
                Leave
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2>{this.state.organisationName}</h2>
            <br />
            <button>View Shifts</button>
            <button onClick={() => this.setState({ editing: true })}>
              Edit
            </button>
            <button onClick={this.leaveOrganisation}>Leave</button>
          </div>
        )}
      </center>
    );
  }

  render() {
    const { sessionId, organisationId } = this.state;
    if (sessionId) {
      return (
        <div className="container">
          <Header
            getName={this.getName}
            requestLogout={this.requestLogout}
            sessionId={sessionId}
          />
          {organisationId ? (
            this.renderSummary()
          ) : (
            <Organisations
              getOrganisations={this.getOrganisations}
              createOrganisation={this.createOrganisation}
              joinOrganisation={this.joinOrganisation}
              organisations={this.state.organisations}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="container">
          <Header requestLogout={this.requestLogout} />
          {this.state.showSignUpComponent ? (
            <Signup
              handleSignUpButton={this.handleSignUpButton}
              requestSignup={this.requestSignup}
            />
          ) : (
            <Login
              handleSignUpButton={this.handleSignUpButton}
              requestLogin={this.requestLogin}
            />
          )}
        </div>
      );
    }
  }
}

export default App;
