import React, { Component } from "react";
import TotalsTracker from "../common/TotalsTracker";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="landing-main">
        <header className="site-splash">
          <h1>Healthy you, healthy planet</h1>
        </header>

        <Container maxWidth="lg" className="img-container">
          <img
            className="welcome-image"
            src="https://greenlete.s3-us-west-1.amazonaws.com/assets/IMG_20190618_181554256_HDR.jpg"
            alt="Trash"
          />
        </Container>
        <TotalsTracker />
      </article>
    );
  }
}

export default Landing;
