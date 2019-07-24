import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer>
        <Link to="/about">About</Link>
      </footer>
    );
  }
}
