import React, { Component } from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutType: "",
      distance: "",
      distanceUnits: "",
      duration: "",
      litterCount: "",
      userId: this.props.userData,
      redirectPath: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();

    axios({
      method: "post",
      url: `/api/users/${this.props.userData.id}/workouts/create`,
      data: this.state
    })
      .then(res => {
        if (res.status === 200) {
          this.props.updateWorkout(res.data.workoutData);
          this.state.redirectPath = res.data.redirectPath;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const units = [
      {
        value: "miles",
        label: "Imperial"
      },
      {
        value: "km",
        label: "Metric"
      }
    ];
    return (
      <article>
        <section>
          <form
            action={`/api/users/${this.props.userData}/workouts/create`}
            method="post"
          >
            <TextField
              id="outlined-name"
              label="Activity"
              className="text-field"
              name="workoutType"
              margin="normal"
              variant="outlined"
              value={this.state.workoutType}
              onChange={this.handleInputChange}
              autofocus
              required
            />
            <TextField
              id="outlined-number"
              label="Distance"
              name="distance"
              value={this.state.distance}
              onChange={this.handleInputChange}
              type="number"
              className="text-field"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
            {this.state.distanceUnits === "Imperial" ? <p>mi</p> : <p>km</p>}
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              className="text-field"
              name="distanceUnits"
              value={this.state.distanceUnits}
              onChange={this.handleInputChange}
              helperText="Please select units"
              margin="normal"
              variant="outlined"
            >
              {units.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-name"
              label="Duration"
              className="text-field"
              name="duration"
              type="number"
              margin="normal"
              variant="outlined"
              value={this.state.duration}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              id="outlined-name"
              label="Litter grabbed"
              className="text-field"
              name="litterCount"
              type="number"
              margin="normal"
              variant="outlined"
              value={this.state.litterCount}
              onChange={this.handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Add workout
            </Button>
          </form>
        </section>
      </article>
    );
  }
}

export default AddWorkout;