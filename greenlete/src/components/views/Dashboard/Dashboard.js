import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TotalsTracker from "../../common/TotalsTracker";
import Container from "@material-ui/core/Container";
import { styles } from "../../styles/dashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
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
