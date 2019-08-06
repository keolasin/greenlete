import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import "./App.css";

import Navbar from "./components/common/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/common/Footer";
import SignUp from "./components/SignUp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentUser: false,
      userData: {}
    };
  }

  callAPI() {
    fetch("/api/testApi")
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        this.setState(
          {
            loading: false,
            userData: resData
          },
          () => {
            console.log("State updated");
          }
        );
      });
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Navbar
          isLoading={this.state.isLoading}
          userData={this.state.userData}
        />
        <main>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route
            path="/users/sign_up"
            render={props => <SignUp {...props} />}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
