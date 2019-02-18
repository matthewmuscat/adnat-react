import React, { Component } from "react";

export class Signup extends Component {
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

          <form
            action="/auth/signup"
            method="post"
            onSubmit={this.props.requestSignup}
          >
            <input
              type="text"
              id="name"
              className="fadeIn second"
              name="name"
              placeholder="Name"
            />
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
              placeholder="Password (min. 6)"
            />
            <input
              type="text"
              id="passwordConfirmation"
              className="fadeIn third"
              name="passwordConfirmation"
              placeholder="Confirm Password"
            />
            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>

          <div id="formFooter">
            <a onClick={this.props.handleSignUpButton} className="underlineHover">
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
