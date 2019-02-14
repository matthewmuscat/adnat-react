import React, { Component } from "react";
import "./App.css";
import { Header } from "./components/header.js";
import { Login } from "./components/login.js";
import Signup from "./components/signup";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Signup />
      </div>
    );
  }
}

export default App;
