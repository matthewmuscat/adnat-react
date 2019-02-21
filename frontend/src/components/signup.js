import React, { Component } from "react";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined
    };
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signup(e) {
    e.preventDefault();
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };

    console.log(data);

    fetch("http://localhost:3000/auth/signup/", {
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
            this.setState({
              sessionId: json.sessionId
            });
          });
        } else {
          console.log("Sign Up Failed");
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
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
              id="icon"
              alt="User Icon"
            />
          </div>

          <form action="/auth/signup" method="post" onSubmit={this.signup}>
            <input
              type="text"
              id="name"
              className="fadeIn second"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="Password (min. 6)"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              type="text"
              id="passwordConfirmation"
              className="fadeIn third"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>

          <div id="formFooter">
            <a
              onClick={this.props.handleSignUpButton}
              className="underlineHover"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
