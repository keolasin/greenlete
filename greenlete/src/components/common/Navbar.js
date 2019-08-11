import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  isSignedIn() {
    return this.props.userData.id ? true : false;
  }

  logout(event) {
    event.preventDefault();
    axios
      .post("users/logout")
      .then(res => {
        if (res.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            userData: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error: ");
        console.log(error);
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <header className="navbar">
        <Link to="/" id="main-site-name">
          Greenlete
        </Link>

        <Link to="/users/sign_in" className="sign-up-button">
          Sign in
        </Link>

        <Link to="/users/sign_up" className="sign-up-button">
          Join
        </Link>
      </header>
    );
  }
}

export default Navbar;
