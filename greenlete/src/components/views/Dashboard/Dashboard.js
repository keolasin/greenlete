import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TotalsTracker from "../../common/TotalsTracker";
import LitterMap from "../../common/LitterMap";
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
        <header className="site-splash dashboard">Welcome!</header>
        <LitterMap />
        <TotalsTracker />
      </article>
    );
  }
}

export default Dashboard;
