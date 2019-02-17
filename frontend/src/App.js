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
      name: ""
    };
    this.requestLogin = this.requestLogin.bind(this);
    this.requestSignup = this.requestSignup.bind(this);
    this.requestLogout = this.requestLogout.bind(this);
    this.getName = this.getName.bind(this);
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
        name: ""
      })
    );
  } 

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
          name: json.name
        });
        
      });
    });
    return this.state.name;
  }
 

  render() {
    const { sessionId } = this.state;
    if (sessionId) {
      return (
        <div className="container">
          <Header
            getName={this.getName}
            requestLogout={this.requestLogout}
            sessionId = {sessionId}
          />
          <Organisations />
        </div>
      );
    } else {
      return (
        <div className="container">
          <Header requestLogout={this.requestLogout} />
          <Login requestLogin={this.requestLogin} />
          {/* <Signup requestSignup={this.requestSignup} /> */}
        </div>
      );
    }
  }
}

export default App;
