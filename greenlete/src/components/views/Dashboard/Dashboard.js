import React, { Component } from "react";
import TotalsTracker from "../../common/TotalsTracker";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { styles } from "../../styles/dashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article style={styles.container}>
        <header className="site-splash dashboard"></header>

        <Container maxWidth="lg">
          <p>Welcome!</p>
        </Container>
        <TotalsTracker />
      </article>
    );
  }
}

export default Dashboard;
