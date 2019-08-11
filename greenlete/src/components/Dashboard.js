import React, { Component } from "react";
import TotalsTracker from "./common/TotalsTracker";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

class Dashboard extends Component {
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
        <TotalsTracker />
      </article>
    );
  }
}

export default Dashboard;
