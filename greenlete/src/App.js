import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Navbar from "./components/common/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/common/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: []
    };
  }

  callAPI() {
    fetch("http://localhost:5000/testApi")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  componentDidMount() {
    this.callAPI();
    console.log(this.state.apiResponse);
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <main>
          <Route exact path="/" render={props => <Landing {...props} />} />
          {this.state.apiResponse}
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
