import React, { Component } from "react";

export class Shifts extends Component {
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
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>

            <tr>
              
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
              
            </tr>
          </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default Shifts;
