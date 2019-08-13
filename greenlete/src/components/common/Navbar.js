import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    let dashboardPath = loggedIn
      ? `/users/${this.props.userData}/dashboard`
      : "/";

    return (
      <header className="navbar">
        <Link to={dashboardPath} id="main-site-name">
          Greenlete
        </Link>
        {loggedIn ? (
          <Link
            to="/"
            onClick={event => this.logout(event)}
            className="large-button"
          >
            Logout
          </Link>
        ) : (
          <section>
            <Link to="/users/sign_in" className="large-button">
              Sign in
            </Link>
            <Link to="/users/sign_up" className="large-button">
              Sign Up
            </Link>
          </section>
        )}
      </header>
    );
  }
}

export default Navbar;
