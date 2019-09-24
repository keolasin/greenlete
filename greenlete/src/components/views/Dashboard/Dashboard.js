import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import TotalsTracker from "../../common/TotalsTracker";
import LitterMap from "../../common/LitterMap";
import Container from "@material-ui/core/Container";
import { styles } from "../../styles/dashboard";

function Dashboard(props) {
  if (!props.userData) {
    return <Redirect to="/" />;
  }
  return (
    <article style={styles.container}>
      <header className="site-splash dashboard">Welcome!</header>
      <LitterMap userData={props.userData} />
      <TotalsTracker />
    </article>
  );
}

export default Dashboard;
