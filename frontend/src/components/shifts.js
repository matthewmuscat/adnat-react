import React, { Component } from "react";

export class Shifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      start: "",
      finish: "",
      breakLength: ""
    };
  }

  // Handle text input on change
  handleTextInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  // Fetch shift data and insert listings into table format
  drawTable() {
    let table = [];
    for (let i = 0; i < this.props.shifts.length; i++) {
      let column = [];
      let hourlyRate;

      for (let j = 0; j < this.props.organisations.length; j++) {
        if (
          this.props.userAttributes.organisationId ===
          this.props.organisations[j].id
        ) {
          hourlyRate = this.props.organisations[j].hourlyRate;
        }
      }

      let start = new Date(
        this.props.shifts[i].date + " " + this.props.shifts[i].start
      ).getHours();
      let finish = new Date(
        this.props.shifts[i].date + " " + this.props.shifts[i].finish
      ).getHours();
      let shiftLength = finish - start; // finish time – start time
      let shiftCost =
        (finish - start - this.props.shifts[i].breakLength / 60) * hourlyRate; // hours worked * organisation hourly rate

      column.push(<td key={"id" + i}>{this.props.shifts[i].id}</td>);
      column.push(<td key={"userId" + i}>{this.props.shifts[i].userId}</td>);
      column.push(
        <td key={"date" + i}>{this.props.shifts[i].start.substr(0, 10)}</td>
      );
      column.push(
        <td key={"start" + i}>{this.props.shifts[i].start.substr(10, 15)}</td>
      );
      column.push(
        <td key={"finish" + i}>{this.props.shifts[i].finish.substr(10, 15)}</td>
      );
      column.push(
        <td key={"breakLength" + i}>{this.props.shifts[i].breakLength}</td>
      );
      column.push(<td key={"shiftLength" + i}>{shiftLength}</td>);
      column.push(<td key={"shiftCost" + i}>{"$" + shiftCost}</td>);

      if (this.props.userAttributes.id === this.props.shifts[i].userId) {
        column.push(
          <td key={"edit" + i}>
            <button
              onClick={() => {
                this.edit(i);
              }}
            >
              Edit
            </button>
          </td>
        );
        column.push(
          <td key={"delete" + i}>
            <button
              onClick={() => {
                this.deleteShift(i);
              }}
            >
              Delete
            </button>
          </td>
        );
      }
      // draw table
      table.push(<tr key={"column" + i}>{column}</tr>);
    }
    return table;
  }

  // Request to create a new shift
  createShift = e => {
    e.preventDefault();
    var data = {
      userId: this.props.userAttributes.id,
      start: this.state.date + " " + this.state.start,
      finish: this.state.date + " " + this.state.finish
    };
    // allow option to set break length (optional)
    if (this.state.breakLength !== "") {
      data.breakLength = this.state.breakLength;
    }

    fetch("http://localhost:3000/shifts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.props.sessionId
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        this.props.getData(this.props.sessionId);
      })
      .catch(res => {
        console.log(res);
      });
      this.setState({
        date: "",
        start: "",
        finish: "",
        breakLength: ""
      })
  };

  // Request to delete a shift
  deleteShift = (i) => {
    fetch("http://localhost:3000/shifts/" + this.props.shifts[i].id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.props.sessionId
      }
    })
      .then(res => {
        this.props.getData(this.props.sessionId);
      })
      .catch(res => {
        console.log(res);
      });
    }

  render() {
    return (
      <div>
        <br />
        <br />
        <p>Shifts</p>
          <table>
            <thead>
              <tr>
                <th>Shift ID</th>
                <th>Employee ID</th>
                <th>Shift date</th>
                <th>Start time</th>
                <th>Finish time</th>
                <th>Break length (mins)</th>
                <th>Hours worked</th>
                <th>Shift cost</th>
              </tr>
            </thead>
            <tbody>
              {this.drawTable()} 
              <tr>
        <td />
        <td>{this.props.userAttributes.name}</td>
        <td>
          <input
            value={this.state.date}
            type="text"
            name="date"
            onChange={this.handleTextInput}
            required={true}
          />
        </td>
        <td>
          <input
            value={this.state.start}
            type="text"
            name="start"
            onChange={this.handleTextInput}
            required={true}
          />
        </td>
        <td>
          <input
            value={this.state.finish}
            type="text"
            name="finish"
            onChange={this.handleTextInput}
            required={true}
          />
        </td>
        <td>
          <input
            value={this.state.breakLength}
            type="number"
            name="breakLength"
            onChange={this.handleTextInput}
          />
        </td>
        <td colSpan="2">
          <input type="submit" onClick={this.createShift} value="Create Shift" />
        </td>
      </tr>
            </tbody>
          </table>
        <br />
        <br />
        <button onClick={this.props.toggleShift}>Back to Summary</button>
      </div>
    );
  }
}

export default Shifts;
