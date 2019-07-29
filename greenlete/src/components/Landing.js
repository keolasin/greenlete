import React, { Component } from "react";
import TotalsTracker from "./common/TotalsTracker";

class Landing extends Component {
  render() {
    return (
      <article>
        <header>
          <h1>Healthy you, healthy planet</h1>
        </header>

        <section>
          <img src="" alt="interactive map will go here" />
        </section>
        <TotalsTracker />
      </article>
    );
  }
}

export default Landing;
