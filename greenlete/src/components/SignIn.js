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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
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
      url: "/api/users/sign_in",
      data: this.state
    })
      .then(res => {
        if (res.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            userData: res.data.user
          });
        }
      })
      .catch(error => {
        console.log("Login error");
        console.log(error);
      });
  }

  render() {
    return (
      <article className="sign-in-page">
        <section className="sign-in-box">
          <Button type="submit" variant="outlined" color="primary">
            Google
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Strava
          </Button>
          <form action="/api/users/sign_in" method="post">
            <TextField
              id="outlined-name"
              label="Username"
              className="text-field"
              name="username"
              autoComplete="username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleInputChange}
              autofocus
              required
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              className="text-field"
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Sign in
            </Button>
          </form>
        </section>
      </article>
    );
  }
}

export default SignIn;
