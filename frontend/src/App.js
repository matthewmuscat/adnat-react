import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import components
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Organisations from "./components/Organisations";
import Shifts from "./components/Shifts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAttributes: {
        organisationId: ""
      },
      sessionId: undefined,
      organisations: [],
      showSignUpComponent: false,
      shifts: undefined,
      showShifts: undefined
    };
  }

  // Logout state handler function
  logout = () => {
    this.setState({ sessionId: undefined, showShifts: false});
  };

  // Get user attributes
  fetchUserAttributes = (sessionId) => {
    return fetch("/users/me/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": sessionId
      }
    });
  };

  // Callback function to update user attributes, organisations and shifts using updated sessionId
  callbackSessionId = (sessionId) => {
    let promise1 = this.fetchUserAttributes(sessionId)
        .then(response => response.json())
        .then(json => this.setState({
            userAttributes: json
        }));
    Promise.all([promise1]).then(() => {
        let promise2 = this.getOrganisations(sessionId)
            .then(response => response.json())
            .then(json => this.setState({
                organisations: json
            }));
        
            console.log(sessionId);
        let promise3 = this.getShifts(sessionId)
            .then(response => response.json())
            .then(json => this.setState({
                shifts: json
            }));
        // this.setState({
        //     sessionId: sessionId
        // });
        Promise.all([promise2, promise3]).then(() => {
            this.setState({
                sessionId: sessionId
            });
        });
    });
};

  // Get initial user attributes, organisations and shift data
  fetchData = () => {
    let promise1 = this.fetchUserAttributes(this.state.sessionId)
        .then(response => response.json())
        .then(json => this.setState({
            userAttributes: json
        }));
    Promise.all([promise1]).then(() => {
        let promise2 = this.getOrganisations(this.state.sessionId)
            .then(response => response.json())
            .then(json => this.setState({
                organisations: json
            }));
        let promise3 = this.getShifts(this.state.sessionId)
            .then(response => response.json())
            .then(json => this.setState({
                shifts: json
            }));
        Promise.all([promise2, promise3]).then(() => {
            this.forceUpdate();
        });
    });
};

  // Get list of organisations
  getOrganisations = (sessionId) => {
    return fetch("/organisations", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": sessionId
      }
    });
  };
  
  // Get list of shifts
  getShifts = (sessionId) => {
    return fetch("/shifts", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": sessionId
      }
    });
  };

  // Handle Sign Up / Login UI
  handleSignUpButton = () => {
    this.setState(prevState => ({
      showSignUpComponent: !prevState.showSignUpComponent
    }));
  }

  // Handle Shifts view with toggle
  toggleShift = () => {
    this.setState(prevState => ({
      showShifts: !prevState.showShifts
    }));
  }

  render() {
    // If the user has not logged in yet
    if (this.state.sessionId === undefined) {
      return (
        <Router>
          <div>
            <Header logout={this.logout} sessionId={this.state.sessionId} />
            <Switch>
              {/* If user has pressed 'sign up' */}
              {this.state.showSignUpComponent ? (
                <Route
                  // path="/register"
                  render={props => (
                    <SignUp
                      {...props}
                      sessionId={this.state.sessionId}
                      callbackSessionId={this.callbackSessionId}
                      handleSignUpButton={this.handleSignUpButton}
                    />
                  )}
                />
              ) : (
                // Otherwise show Login
                <Route
                  render={props => (
                    <Login
                      {...props}
                      sessionId={this.state.sessionId}
                      callbackSessionId={this.callbackSessionId}
                      handleSignUpButton={this.handleSignUpButton}
                    />
                  )}
                />
              )}
            </Switch>
          </div>
        </Router>
      );
    }

    // If user has logged in
    return (
      <Router>
        <div>
          <Header
            sessionId={this.state.sessionId}
            logout={this.logout}
            userAttributes={this.state.userAttributes}
          />
          <div className="container">
          {/* If user is viewing shifts */}
            {this.state.showShifts ? (
              <Shifts
                sessionId={this.state.sessionId}
                userAttributes={this.state.userAttributes}
                organisations={this.state.organisations}
                shifts={this.state.shifts}
                getData={this.fetchData}
                toggleShift={this.toggleShift}
              />
            ) : (
              // If not, show organisations
              <Route
                render={props => (
                  <Organisations
                    {...props}
                    sessionId={this.state.sessionId}
                    userAttributes={this.state.userAttributes}
                    organisations={this.state.organisations}
                    getData={this.fetchData}
                    getOrganisations={this.getOrganisations}
                    toggleShift={this.toggleShift}
                  />
                )}
              />
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
