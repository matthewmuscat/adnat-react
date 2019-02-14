import React, { Component } from "react";
import "./style.css";

export class Login extends Component {
  render() {
    return (
      <div>
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
              id="icon"
              alt="User Icon"
            />
          </div>

          <form>
            <input
              type="text"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="Email"
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="Password"
            />
            <br />
            <br />
            <input type="checkbox" name="confirm" value="confirm" />
            Remember Me?
            <br />
            <br />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
            <br />
            <a className="underlineHover" href="#">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
