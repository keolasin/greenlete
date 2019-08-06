import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  isSignedIn() {
    if (this.props.userData.id) {
      return true;
    } else {
      return false;
    }
  }

  render() {
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
