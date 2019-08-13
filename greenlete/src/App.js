import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Navbar from "./components/common/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/common/Footer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loggedIn: false,
      userData: null
    };

    this.updateUser = this.updateUser.bind(this);
  }

  checkUser() {
    axios(`/api/users/check`).then(res => {
      if (res.data.user) {
        this.setState({
          loggedIn: true,
          userData: res.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          userData: null
        });
      }
    });
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  componentDidMount() {
    this.checkUser();
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Navbar
          updateUser={this.updateUser}
          loggedIn={this.state.loggedIn}
          userData={this.state.userData}
        />
        <main>
          <Route
            exact
            path="/"
            render={props => (
              <Landing {...props} updateUser={this.updateUser} />
            )}
          />
          <Route
            path="/users/sign_up"
            render={props => <SignUp {...props} updateUser={this.updateUser} />}
          />
          <Route
            path="/users/sign_in"
            render={props => <SignIn {...props} updateUser={this.updateUser} />}
          />
          <Route
            path={`/users/:id/dashboard`}
            render={props => <Dashboard {...props} />}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
