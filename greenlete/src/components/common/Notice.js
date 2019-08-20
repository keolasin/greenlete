import React, { Component } from "react";
import { styles } from "../styles/notice";

class Notice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { notice } = this.props; // destructure error received from this.props for later use
    console.log(notice);
    if (!notice) {
      // if no error, don't render our notice component (Null)
      return null;
    }
    //render our component if we have an error
    return (
      <section>
        <p>notice message</p>
      </section>
    );
  }
}

export default Notice;
