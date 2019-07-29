import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <Link to="/">Greenlete</Link>
      </header>
    );
  }
}

export default Navbar;
