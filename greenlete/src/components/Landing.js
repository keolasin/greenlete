import React, { Component } from "react";
import TotalsTracker from "./common/TotalsTracker";

class Landing extends Component {
  render() {
    return (
      <article>
        // main heading
        <header>
          <h1>For a healthy lifestyle and a healthy planet</h1>
        </header>
        // map
        <section>
          <img src="" alt="interactive map will go here" />
        </section>
        // trash picked up, miles covered tracker
        <TotalsTracker />
      </article>
    );
  }
}
