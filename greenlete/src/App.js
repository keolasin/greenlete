import React, { Component } from "react";
import { Route } from "react-router-dom";
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
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(data => {
        return this.setState({ data }, () => {
          console.log("State updated successfully");
        });
      });
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <main>
          <Route exact path="/" render={props => <Landing {...props} />} />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
