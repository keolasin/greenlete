import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
            isLoggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error ", error);
      });
  }

  render() {
    let { userData, isLoggedIn } = this.props;
    let dashboardPath = isLoggedIn ? `/users/${userData}/dashboard` : "/";

    return (
      <header className="navbar">
        <NavLink to={dashboardPath} id="main-site-name">
          Greenlete
        </NavLink>

        {isLoggedIn ? (
          <section style={styles.secondaryNavContainer}>
            <NavLink to={`/users/${userData}/stats`} style={styles.dashLinks}>
              Stats
            </NavLink>
            <NavLink
              to={`/users/${userData}/workouts/addWorkout`}
              style={styles.dashLinks}
            >
              Add a workout
            </NavLink>
            <button onClick={this.logout} style={styles.largeButton}>
              Logout
            </button>
          </section>
        ) : (
          <section>
            <NavLink to="/users/sign_in" style={styles.largeButton}>
              Sign in
            </NavLink>
            <NavLink to="/users/sign_up" style={styles.largeButton}>
              Sign Up
            </NavLink>
          </section>
        )}
      </header>
    );
  }
}

export default Navbar;
