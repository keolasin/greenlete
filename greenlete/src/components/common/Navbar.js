import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styles } from "../styles/navbar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: `/api/users/sign_out`
    })
      .then(res => {
        if (res.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            userData: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error ", error);
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    let { userData } = this.props;
    let dashboardPath = loggedIn ? `/users/${userData}/dashboard` : "/";

    return (
      <header className="navbar">
        <Link to={dashboardPath} id="main-site-name">
          Greenlete
        </Link>

        {loggedIn ? (
          <section style={styles.secondaryNavContainer}>
            <Link to={`/users/${userData}/stats`} style={styles.dashLinks}>
              Stats
            </Link>
            <Link to={`/users/${userData}/addWorkout`} style={styles.dashLinks}>
              Add a workout
            </Link>
            <Link
              to="/users/sign_in"
              onClick={event => this.logout(event)}
              style={styles.largeButton}
            >
              Logout
            </Link>
          </section>
        ) : (
          <section>
            <Link to="/users/sign_in" style={styles.largeButton}>
              Sign in
            </Link>
            <Link to="/users/sign_up" style={styles.largeButton}>
              Sign Up
            </Link>
          </section>
        )}
      </header>
    );
  }
}

export default Navbar;
