import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import SignUp from "./SignUp";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  // Request login
  login = e => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };

    fetch("http://localhost:3000/auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.props.callbackSessionId(json.sessionId);
          });
        } else {
          console.log("Invalid Login Details");
        }
      })
      .catch(res => {
        console.log(res);
      });
  };

  // Handle text input on change
  handleTextInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <div>
        {!this.props.sessionId ? (
          <div className="login">
            <div id="formContent">
              <div className="fadeIn first">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
                  id="icon"
                  alt="User Icon"
                />
              </div>

              <form
                onSubmit={this.login}
                action="http://localhost:3000/auth/login"
                method="post"
              >
                <input
                  type="text"
                  id="email"
                  className="fadeIn second"
                  name="email"
                  placeholder="Email"
                  required={true}
                  value={this.state.email}
                  onChange={this.handleTextInput}
                />
                <input
                  type="text"
                  id="password"
                  className="fadeIn third"
                  name="password"
                  placeholder="Password"
                  required={true}
                  value={this.state.password}
                  onChange={this.handleTextInput}
                />
                <br />
                <br />
                {/* <input type="checkbox" name="confirm" value="confirm" />
                Remember Me?
                <br />
                <br /> */}
                <input type="submit" className="fadeIn fourth" value="Log In" />
              </form>

              <div id="formFooter">
                {/* <a className="underlineHover">Forgot Password?</a> */}

                <a
                  onClick={this.props.handleSignUpButton}
                  className="underlineHover"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        ) : (
          <SignUp />
        )}
      </div>
    );
  }
}

export default Login;
