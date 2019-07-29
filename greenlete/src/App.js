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
      data: []
    };
  }

  callAPI() {
    fetch("http://localhost:5000/testApi")
      .then(res => res.json())
      .then(data => {
        console.log(`fetch call data: `);
        console.log(JSON.stringify(data));
        return this.setState({ data }, () => {
          console.log("inside callback: " + this.state.data);
        });
      });
  }

  componentDidMount() {
    this.callAPI();
    console.log(`after callAPI(): ${this.state.data}`);
  }

  render() {
    console.log(`inside render: ${this.state.data}`);
    return (
      <div className="App">
        <Navbar />

        <main>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <ul>
            {this.state.data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
