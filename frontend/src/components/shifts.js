import React, { Component } from "react";

export class Shifts extends Component {
  componentDidMount() {
    this.getShifts();
  }

  constructor(props) {
    super(props);
    this.state = {
      date: "",
      start: "",
      finish: "",
      breakLength: ""
    };
  }

  createTable() {}

  createShift() {}

  getShifts() {}

  render() {
    return (
      <div>
        <h2>Organisation Name</h2>
        <br />
        <br />
        <p>Shifts</p>
        <form action="/shifts" method="post" onSubmit={this.props.createShift}>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Shift date</th>
                <th>Start time</th>
                <th>Finish time</th>
                <th>Break length (mins)</th>
                <th>Hours worked</th>
                <th>Shift cost</th>
              </tr>
            </thead>
            <tbody>{this.createTable()}</tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Shifts;

{
  /* <tr>
                <td>Your Username</td>
                <td>
                  <input type="text" name="shiftDate" />
                </td>
                <td>
                  <input type="text" name="start" />
                </td>
                <td>
                  <input type="text" name="finish" />
                </td>
                <td>
                  <input type="text" name="breakLength" />
                </td>
                <td colSpan="2">
                  <input type="submit" value="Create Shift" />
                </td>
              </tr> */
}
