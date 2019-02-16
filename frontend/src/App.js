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
      loggedIn: false,
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
        "Content-Type": "application/json",
        Authorization: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            loggedIn: true,
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
        "Content-Type": "application/json",
        Authorization: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            loggedIn: true,
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
        Authorization: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }
    }).then(
      this.setState({
        loggedIn: false,
        sessionId: ""
      })
    );
  } // setstate logged in to false

  getName() {
    fetch("http://localhost:3000/users/me/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }
    }).then(response => {
      response.json().then(json => {
        console.log(json);
        this.setState({
          name: json.name
        });
      });
    });
  }

  render() {
    const { loggedIn } = this.state;

    if (loggedIn) {
      console.log(this.state.sessionId);
      // console.log(name);
      return (
        <div className="container">
          <Header
            loggedIn={loggedIn}
            getName={this.getName}
            requestLogout={this.requestLogout}
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
