import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { styles } from "../styles/card";

class MediaCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      imageSource,
      imageTitle,
      imageAlt,
      headline,
      description
    } = this.props;
    return (
      <section style={styles.card}>
        <img
          style={styles.img}
          src={imageSource}
          title={imageTitle}
          alt={imageAlt}
        />
        <section style={styles.textBox}>
          <h2 style={styles.h2}>{headline}</h2>
          <p style={styles.description}>{description}</p>
        </section>
      </section>
    );
  }
}

export default MediaCard;
