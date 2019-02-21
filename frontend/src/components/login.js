import React, { Component } from "react";
import Signup from "./SignUp";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(e) {
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
            console.log("worked");
          });
        } else {
          console.log("Login Failed");
        }
      })
      .catch(res => {
        console.log(res);
      });
  }

  handleChange = ({ target }) => {
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

              <form onSubmit={this.login} action="/auth/login" method="post">
                <input
                  type="text"
                  id="email"
                  className="fadeIn second"
                  name="email"
                  placeholder="Email"
                  required={true}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  id="password"
                  className="fadeIn third"
                  name="password"
                  placeholder="Password"
                  required={true}
                  value={this.state.password}
                  onChange={this.handleChange}
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
          <Signup />
        )}
        )
      </div>
    );
  }
}

export default Login;
