import React, { Component } from "react";
import TotalsTracker from "./common/TotalsTracker";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

class SignUp extends Component {
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
      url: "/api/users/register",
      data: this.state
    })
      .then(res => {
        console.log(res);
        if (!res.data.errorMessage) {
          this.props.updateUser({
            loggedIn: true,
            userData: res.data.user
          });
        } else {
          let error = res.error;
          console.log(error);
        }
      })
      .catch(error => {
        console.log("Sign-up error:");
        console.log(error);
      });
  }

  render() {
    return (
      <article className="sign-in-page">
        <section className="sign-up-images">
          <img
            className="welcome-image"
            src="https://greenlete.s3-us-west-1.amazonaws.com/assets/IMG_20190620_185724283_HDR.jpg"
            alt="Trash from bike ride"
          />
        </section>
        <section className="sign-in-box">
          <Button type="submit" variant="outlined" color="primary">
            Google
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Strava
          </Button>
          <form action="/api/users/register" method="post">
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
              required
              autofocus
            />

            <TextField
              id="outlined-email-input"
              label="Email"
              className="text-field"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleInputChange}
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
              Join
            </Button>
          </form>
        </section>
      </article>
    );
  }
}

export default SignUp;
