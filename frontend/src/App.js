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
      userData: {
        organisationId: ""
      },
      sessionId: undefined,
      organisationId: "",
      organisations: [],
      editing: false,
      showSignUpComponent: false,
      shifts: undefined
    };

    this.logout = this.logout.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleSignUpButton = this.handleSignUpButton.bind(this);
    // this.getOrganisations = this.getOrganisations.bind(this);
    // this.createOrganisation = this.createOrganisation.bind(this);
    // this.joinOrganisation = this.joinOrganisation.bind(this);
    // this.leaveOrganisation = this.leaveOrganisation.bind(this);
    // this.editOrganisation = this.editOrganisation.bind(this);
  }

  // log out
  logout() {
    return fetch("http://localhost:3000/auth/logout", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.sessionId
      }
    }).then(this.setState({ sessionID: undefined }));
  }

  // get user data
  fetchUserData = sessionId => {
    return fetch("http://localhost:3000/users/me/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: sessionId
      }
    });
  };

  callbackSessionId = sessionId => {
    let promise1 = this.fetchUserData(sessionId).then(res => {
      this.setState({ userData: res.data });
    });
    console.log(this.state.userData.organisationId);

    Promise.all([promise1]).then(() => {
      // if (this.state.userData.organisationId === null) {
      //   let promise2 = this.getOrganisations(sessionId).then(res => {
      //     this.setState({ organisations: res.data });
      //   });
      //   Promise.all([promise2]).then(() => {
      //     this.setState({ sessionID: sessionId });
      //   });
      // } else {
      let promise2 = this.getOrganisations(sessionId).then(res => {
        this.setState({ organisations: res.data });
      });
      let promise3 = this.getShifts(sessionId).then(res => {
        this.setState({ shifts: res.data });
      });
      Promise.all([promise2, promise3]).then(() => {
        this.setState({ sessionId: sessionId });
      });
      // }
    });
  };

  // get account data
  fetchData = sessionId => {
    let promise1 = this.fetchUserData(this.state.sessionId).then(res => {
      this.setState({ userData: res.data });
    });

    Promise.all([promise1]).then(() => {
      if (this.state.userData.organisationId === null) {
        let promise2 = this.getOrganisations(this.state.sessionId).then(res => {
          this.setState({ organisations: res.data });
        });
        Promise.all([promise2]).then(() => {
          this.forceUpdate();
        });
      } else {
        let promise2 = this.getOrganisations(this.state.sessionId).then(res => {
          this.setState({ organisations: res.data });
        });
        let promise3 = this.getShifts(this.state.sessionId).then(res => {
          this.setState({ shifts: res.data });
        });
        Promise.all([promise2, promise3]).then(() => {
          this.forceUpdate();
        });
      }
    });
  };

  getOrganisations = sessionId => {
    return fetch("http://localhost:3000/organisations", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: sessionId
      }
    });
    // .then(response => {
    //   response.json().then(json => {
    //     this.setState({
    //       organisations: json
    //     });
    //   });
    // });
  };

  getShifts = sessionId => {
    return fetch("http://localhost:3000/shifts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: sessionId
      }
    });
  };

  // joinOrganisation(organisationId, organisationName) {
  //   var data = {
  //     organisationId: organisationId
  //   };
  //   fetch("http://localhost:3000/organisations/join", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: this.state.sessionId
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   this.setState({
  //     organisationName: organisationName
  //   });
  // }

  // createOrganisation(e) {
  //   e.preventDefault();
  //   var data = {
  //     name: e.target.elements.name.value,
  //     hourlyRate: e.target.elements.hourlyRate.value
  //   };

  //   fetch("http://localhost:3000/organisations/create_join", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: this.state.sessionId
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   this.setState({
  //     organisationName: data.name
  //   });
  //   this.getOrganisations(); // update dom
  // }

  // leaveOrganisation() {
  //   fetch("http://localhost:3000/organisations/leave", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: this.state.sessionId
  //     }
  //   });

  //   this.setState({
  //     organisationId: "",
  //     organisationName: ""
  //   });
  // }

  // editOrganisation(e) {
  //   e.preventDefault();
  //   var data = {
  //     // user id
  //     name: e.target.elements.name.value,
  //     hourlyRate: e.target.elements.hourlyRate.value
  //   };

  //   fetch(
  //     "http://localhost:3000/organisations/" +
  //       this.state.organisationId.toString(),
  //     {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: this.state.sessionId
  //       },
  //       body: JSON.stringify(data)
  //     }
  //   );
  //   // update dom
  //   this.setState({
  //     organisationName: data.name,
  //     editing: false
  //   });
  // }

  // getShifts(e) {}

  // createShift(e) {
  //   e.preventDefault();
  //   var data = {
  //     // user id
  //     shiftDate: e.target.elements.shiftDate.value,
  //     start: e.target.elements.start.value,
  //     finish: e.target.elements.finish.value,
  //     breakLength: e.target.elements.hourlyRate.value
  //   };

  //   fetch("http://localhost:3000/shifts", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: this.state.sessionId
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   this.getShifts(); // update dom
  // }

  // renderSummary() {
  //   return (
  //     <center>
  //       {this.state.editing ? (
  //         <div>
  //           <h2>Edit {this.state.organisationName}</h2>
  //           <form
  //             action={"/organisations/" + this.state.organisationId}
  //             method="PUT"
  //             onSubmit={this.editOrganisation}
  //           >
  //             <br />
  //             Name <input type="text" id="name" name="name" />
  //             Hourly rate: $<input type="number" name="hourlyRate" />
  //             <input type="submit" value="Update" />
  //             <br />
  //             <button onClick={this.leaveOrganisation} type="button">
  //               Leave
  //             </button>
  //           </form>
  //         </div>
  //       ) : (
  //         <div>
  //           {this.state.shifts ? (
  //             <div>
  //               <Shifts />
  //             </div>
  //           ) : (
  //             <div>
  //               <h2>{this.state.organisationName}</h2>
  //               <br />
  //               <button onClick={() => this.setState({ shifts: true })}>
  //                 View Shifts
  //               </button>
  //               <button onClick={() => this.setState({ editing: true })}>
  //                 Edit
  //               </button>
  //               <button onClick={this.leaveOrganisation}>Leave</button>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </center>
  //   );
  // }

  handleSignUpButton() {
    this.setState(prevState => ({
      showSignUpComponent: !prevState.showSignUpComponent
    }));
  }

  render() {
    // If the user has not logged in yet
    if (this.state.sessionId === undefined) {
      return (
        <Router>
          <div>
            <Header />
            <Switch>
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

    // if user has not joined an organisation

    if (this.state.organisationId === "") {
      return (
        <Router>
          {console.log(this.state.organisations)}
          <div>
            <Header />
            <Route
              render={props => (
                <Organisations
                  {...props}
                  sessionID={this.state.sessionId}
                  userData={this.state.userData}
                  organisations={this.state.organisations}
                  getData={this.fetchData}
                />
              )}
            />
          </div>
        </Router>
      );
    }

    return (
      <Router>
        <Switch>
          <Route
            path="/shifts"
            render={props => (
              <Shifts
                {...props}
                sessionID={this.state.sessionId}
                userData={this.state.userData}
                organisations={this.state.organisations}
                shifts={this.state.shifts}
                getData={this.fetchData}
              />
            )}
          />
          <Route
            path="/organisation"
            render={props => (
              <Organisations
                {...props}
                sessionID={this.state.sessionId}
                userData={this.state.userData}
                organisations={this.state.organisations}
                getData={this.fetchData}
              />
            )}
          />
          <Route
            render={props => (
              <p>Home</p>
              // <Home
              //   {...props}
              //   sessionID={this.state.sessionID}
              //   userData={this.state.userData}
              //   organisations={this.state.organisations}
              //   getData={this.getAllData}
              //   logout={this.logout}
              // />
            )}
          />
        </Switch>
      </Router>
    );

    // const { sessionId, organisationId } = this.state;
    // if (sessionId) {
    //   return (
    //     <div className="container">
    //       <Header
    //         getName={this.getName}
    //         requestLogout={this.requestLogout}
    //         sessionId={sessionId}
    //       />
    //       {organisationId ? (
    //         this.renderSummary()
    //       ) : (
    //         <Organisations
    //           getOrganisations={this.getOrganisations}
    //           createOrganisation={this.createOrganisation}
    //           joinOrganisation={this.joinOrganisation}
    //           organisations={this.state.organisations}
    //           organisationId={this.state.organisationId}
    //         />
    //       )}
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className="container">
    //       <Header requestLogout={this.requestLogout} />
    //       {this.state.showSignUpComponent ? (
    //         <SignUp
    //           handleSignUpButton={this.handleSignUpButton}
    //           requestSignup={this.requestSignup}
    //         />
    //       ) : (
    //         <Login
    //           handleSignUpButton={this.handleSignUpButton}
    //           requestLogin={this.requestLogin}
    //         />
    //       )}
    //     </div>
    //   );
    // }
  }
}

export default App;
