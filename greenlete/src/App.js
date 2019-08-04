import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import "./App.css";

import Navbar from "./components/common/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/common/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  callAPI() {
    fetch("/api/testApi")
      .then(res => res.json())
      .then(serverData => {
        this.setState({ data: serverData }, () => {
          console.log("State updated");
        });
      });
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <main>
          <Route
            exact
            path="/landing"
            render={props => <Landing {...props} />}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
