import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TotalsTracker from "../../common/TotalsTracker";
import LitterMap from "../../common/LitterMap";
import Container from "@material-ui/core/Container";
import { styles } from "../../styles/dashboard";

function Dashboard(props) {
  const [userLitter, setUserLitter] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook for fetching litter from API
  useEffect(() => {
    // nested callback to avoid loops
    const fetchLitterData = async () => {
      const result = await axios(`/api/users/${props.userData}/litter/`);
      setUserLitter(result.data);
    };
    fetchLitterData();
    setIsLoading(false);
  }, []); // empty array as second argument to useEffect means we only run once, after first render, to avoid infinite loop since state is being changed in our useEffect

  if (!props.userData) {
    return <Redirect to="/" />;
  }
  console.table(userLitter);
  return (
    <article style={styles.container}>
      <header className="site-splash dashboard">Welcome!</header>
      <LitterMap userData={props.userData} userLitter={userLitter} />
      <TotalsTracker />
    </article>
  );
}

export default Dashboard;
