import React, { Component } from "react";
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import Organisations from "./components/organisations";
import Shifts from "./components/shifts";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        {/* <Signup /> */}
        {/* <Organisations /> */}
        <Shifts />
      </div>
    );
  }
}

export default App;
