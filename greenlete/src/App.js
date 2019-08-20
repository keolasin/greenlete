import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Navbar from "./components/common/Navbar";
import Landing from "./components/views/Landing";
import Footer from "./components/common/Footer";
import SignUp from "./components/views/Login/SignUp";
import SignIn from "./components/views/Login/SignIn";
import Dashboard from "./components/views/Dashboard/Dashboard";
import HowTo from "./components/views/Dashboard/HowTo";
import AddWorkouts from "./components/views/Workouts/AddWorkout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
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

  componentWillMount() {
    this.checkUser();
  }
  componentDidMount() {
    this.checkUser();
  }

  render() {
    let { loggedIn, userData } = this.state;
    console.log(loggedIn, userData);
    return (
      <div className="App">
        <Navbar
          updateUser={this.updateUser}
          loggedIn={loggedIn}
          userData={userData}
        />
        <main>
          <Route
            exact
            path="/"
            render={props =>
              loggedIn ? (
                <Redirect to={`/users/${this.state.userData}/dashboard`} />
              ) : (
                <Landing {...props} />
              )
            }
          />
          <Route
            path="/users/sign_up"
            render={props => (
              <SignUp
                {...props}
                updateUser={this.updateUser}
                userData={userData}
              />
            )}
          />
          <Route
            path="/users/sign_in"
            render={props => (
              <SignIn
                {...props}
                updateUser={this.updateUser}
                userData={userData}
              />
            )}
          />
          <Route
            path={`/users/${this.state.userData}/dashboard`}
            render={props => (
              <Dashboard {...props} userData={userData} loggedIn={loggedIn} />
            )}
          />
          <Route
            path={`/users/${this.state.userData}/how_to`}
            render={props => <HowTo {...props} userData={userData} />}
          />
          <Route
            path={`/users/:id/workouts/addWorkout`}
            render={props => <AddWorkouts {...props} />}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
