import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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
        console.log(res);
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
        <Container maxWidth="sm">
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
            />

            <Button type="submit" variant="contained" color="primary">
              Sign in
            </Button>
          </form>
        </Container>
      </article>
    );
  }
}

export default SignIn;
