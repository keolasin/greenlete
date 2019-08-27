import React, { Component } from "react";
import axios from "axios";
import { styles } from "../../styles/addWorkout.js";

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
      username: this.props.userData.username,
      userId: this.props.userData.id
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
      url: `/api/users/${this.props.userData}/workouts/create`,
      data: this.state
    })
      .then(res => {
        if (res.status === 200) {
          console.log("success");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let {
      workoutType,
      distance,
      distanceUnits,
      duration,
      litterCount,
      username
    } = this.state;
    let { userData } = this.props;
    console.log(userData);

    const units = [
      {
        value: "mi",
        label: "mi"
      },
      {
        value: "km",
        label: "km"
      }
    ];

    return (
      <article>
        <section>
          <form onSubmit={event => this.onSubmit(event)}>
            <TextField
              id="outlined-name"
              label="Activity"
              className="text-field"
              name="workoutType"
              margin="normal"
              variant="outlined"
              value={this.state.workoutType}
              onChange={this.handleInputChange}
              autoFocus
              required
            />
            <TextField
              id="outlined-number"
              label="Distance"
              name="distance"
              value={this.state.distance}
              onChange={this.handleInputChange}
              inputProps={{ min: "0", step: "1" }}
              type="number"
              className="text-field"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
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
              inputProps={{ min: "0", step: "15" }}
              margin="normal"
              placeholder="minutes"
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
              inputProps={{ min: "0", step: "1" }}
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
