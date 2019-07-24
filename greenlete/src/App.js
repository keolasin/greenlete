import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Navbar from "./components/common/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/common/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <main>
          <Route exact path="/" component={Landing} />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
