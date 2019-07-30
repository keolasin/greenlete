import React, { Component } from "react";

class TotalsTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hard coded for now
      litterCount: 0,
      milesCovered: 0
    };
  }

  render() {
    return (
      <section className="tracker-bar">
        <h4 className="global-tracker">
          <strong>{this.state.litterCount} </strong>
          pieces of trash picked up,
          <strong> {this.state.milesCovered} </strong>
          miles covered
        </h4>
      </section>
    );
  }
}

export default TotalsTracker;
