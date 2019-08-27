import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
            isLoggedIn: true,
            username: res.data.username
          });
        }
      })
      .catch(error => {
        console.log("Login error", error);
      });
  }

  render() {
    let { userData } = this.props;
    if (userData) {
      return <Redirect to={`/users/${userData}/dashboard`} />;
    }
    return (
      <article className="sign-in-page">
        <section className="sign-in-box">
          <Button type="submit" variant="outlined" color="primary">
            Google
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Strava
          </Button>
          <form onSubmit={this.onSubmit}>
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
              autoFocus
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={event => this.onSubmit(event)}
            >
              Sign in
            </Button>
          </form>
        </section>
      </article>
    );
  }
}

export default SignIn;
