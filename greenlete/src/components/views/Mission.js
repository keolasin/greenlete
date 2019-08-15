import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

class Mission extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="dashboard-main">
        <header className="site-splash dashboard">
          <h1>Healthy you, healthy planet</h1>
        </header>

        <Container maxWidth="lg"></Container>
      </article>
    );
  }
}

export default Mission;
