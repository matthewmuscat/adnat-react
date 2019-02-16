import React, { Component } from "react";
import axios from "axios"; // import AJAX external library
// import { observable, action } from "mobx";

// import components
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import Organisations from "./components/organisations";
import Shifts from "./components/shifts";

class App extends Component {
  requestLogin = e => {
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
    });
  };

  requestSignup = e => {
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
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Login requestLogin={this.requestLogin} />
        {/* <Signup requestSignup={this.requestSignup} /> */}
        {/* <Organisations /> */}
        {/* <Shifts /> */}
      </div>
    );
  }
}

export default App;
