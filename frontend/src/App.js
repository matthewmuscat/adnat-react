import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// import components
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Organisations from "./components/Organisations";
import Shifts from "./components/Shifts";
import { fetchUserAttributes, getShifts, getOrganisations } from "./utils/api";

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
    this.setState({
      sessionId: undefined,
      showShifts: false
    });
  };

  // Callback function to update user attributes, organisations and shifts using updated sessionId
  callbackSessionId = sessionId => {
    // fetch user data
    let promise1 = fetchUserAttributes(sessionId)
      .then(response => response.json())
      .then(json =>
        this.setState({
          userAttributes: json,
          sessionId: sessionId
        })
      );

    // fetch organisations (show when not logged in)
    let promise2 = getOrganisations(sessionId)
      .then(response => response.json())
      .then(json =>
        this.setState({
          organisations: json
        })
      );
    Promise.all([promise1, promise2]).then(() => {
      // only get shifts if user has joined an organisation
      if (this.state.userAttributes.organisationId !== null) {
        let promise3 = getShifts(sessionId)
          .then(response => response.json())
          .then(json =>
            this.setState({
              shifts: json
            })
          );
        Promise.all([promise3]).then(() => {
          this.setState({
            sessionId: sessionId
          });
        });
      }
    });
  };

  // Get initial user attributes, organisations and shift data
  fetchData = () => {
    // fetch user data
    let promise1 = fetchUserAttributes(this.state.sessionId)
      .then(response => response.json())
      .then(json =>
        this.setState({
          userAttributes: json
        })
      );

    // fetch organisations (show when not logged in)
    let promise2 = getOrganisations(this.state.sessionId)
      .then(response => response.json())
      .then(json =>
        this.setState({
          organisations: json
        })
      );

    Promise.all([promise1, promise2]).then(() => {
      // only get shifts if user has joined an organisation
      if (this.state.userAttributes.organisationId !== null) {
        let promise3 = getShifts(this.state.sessionId)
          .then(response => response.json())
          .then(json =>
            this.setState({
              shifts: json
            })
          );
        Promise.all([promise3]).then(() => {
          this.forceUpdate();
        });
      }
    });
  };

  // Handle Sign Up / Login UI
  handleSignUpButton = () => {
    this.setState(prevState => ({
      showSignUpComponent: !prevState.showSignUpComponent
    }));
  };

  // Handle Shifts view with toggle
  toggleShift = () => {
    this.setState(prevState => ({
      showShifts: !prevState.showShifts
    }));
  };

  render() {
    // If the user has not logged in yet
    if (this.state.sessionId === undefined) {
      return (
        <Router>
          <div>
            <Header logout={this.logout} sessionId={this.state.sessionId} />

            {/* If user has pressed 'sign up' */}
            {this.state.showSignUpComponent ? (
              <Switch>
                <Route
                  path="/signup"
                  render={props => (
                    <SignUp
                      {...props}
                      sessionId={this.state.sessionId}
                      callbackSessionId={this.callbackSessionId}
                      handleSignUpButton={this.handleSignUpButton}
                    />
                  )}
                />
                <Redirect to="/signup" />
              </Switch>
            ) : (
              <Switch>
                {/* // Otherwise show Login */}
                <Route
                  path="/login"
                  render={props => (
                    <Login
                      {...props}
                      sessionId={this.state.sessionId}
                      callbackSessionId={this.callbackSessionId}
                      handleSignUpButton={this.handleSignUpButton}
                    />
                  )}
                />
                <Redirect to="/login" />
              </Switch>
            )}
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
              <Switch>
                <Route
                  path="/shifts"
                  render={props => (
                    <Shifts
                      {...props}
                      sessionId={this.state.sessionId}
                      userAttributes={this.state.userAttributes}
                      organisations={this.state.organisations}
                      shifts={this.state.shifts}
                      getData={this.fetchData}
                      toggleShift={this.toggleShift}
                    />
                  )}
                />
                <Redirect to="/shifts" />
              </Switch>
            ) : (
              // If not, show organisations
              <Switch>
                <Route
                  path="/organisations"
                  render={props => (
                    <Organisations
                      {...props}
                      sessionId={this.state.sessionId}
                      userAttributes={this.state.userAttributes}
                      organisations={this.state.organisations}
                      getData={this.fetchData}
                      toggleShift={this.toggleShift}
                    />
                  )}
                />
                <Redirect to="/organisations" />
              </Switch>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
