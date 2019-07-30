import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <header className="navbar">
        <Link to="/" id="main-site-name">
          Greenlete
        </Link>
        <Link to="/sign_up" className="sign-up-button">
          Join
        </Link>
      </header>
    );
  }
}

export default Navbar;
