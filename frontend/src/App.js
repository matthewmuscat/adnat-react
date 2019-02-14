import React, { Component } from "react";
import "./App.css";
import { Header } from "./components/header.js";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
}

export default App;
