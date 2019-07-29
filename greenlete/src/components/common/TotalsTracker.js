import React, { Component } from "react";

class TotalsTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hard coded for now
      litterCount: 20,
      milesCovered: 500
    };
  }

  render() {
    return (
      <section>
        <h4>
          <strong>{this.state.litterCount}</strong> pieces of trash picked up,{" "}
          <strong>{this.state.milesCovered}</strong> miles covered.
        </h4>
      </section>
    );
  }
}

export default TotalsTracker;
