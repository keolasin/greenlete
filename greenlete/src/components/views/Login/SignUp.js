import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Notice from "../../common/Notice";
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  async onSubmit(event) {
    event.preventDefault();

    await axios({
      method: "post",
      url: "/api/users/register",
      data: this.state
    })
      .then(res => {
        console.log(res.data);
        if (!res.data.error) {
          //this.setState({ redirect: res.data.redirect }); // set redirect path to how_to page on successful sign-up
          this.props.updateUser({
            // update user object in parent app state
            isLoggedIn: true,
            username: res.data.username
          });
        } else {
          // this.setState({notice: res.data.error }); // render error if sign-up fails
        }
      })
      .catch(error => {
        console.log("Sign-up error:");
        console.log(error);
      });
  }

  render() {
    let { userData } = this.props;
    if (userData) {
      return <Redirect to={`/users/${userData}/how_to`} />;
    }
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
          <Notice message={this.state.notice} />
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
              onChange={event => this.handleInputChange(event)}
              required
              autoFocus
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
              onChange={event => this.handleInputChange(event)}
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
              onChange={event => this.handleInputChange(event)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={event => this.onSubmit(event)}
            >
              Join
            </Button>
          </form>
        </section>
      </article>
    );
  }
}

export default SignUp;
