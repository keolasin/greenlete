import React, { Component } from "react";
import { styles } from "../styles/card";
import Button from "@material-ui/core/Button";
import EditWorkout from "../views/Workouts/EditWorkout";

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
      description,
      isWorkout
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
        {isWorkout ? (
          <section style={styles.buttonContainer}>
            <EditWorkout
              workoutData={this.props.workoutData}
              userData={this.props.userData}
            />
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              onSubmit={event => this.onSubmit(event)}
            >
              Delete
            </Button>
          </section>
        ) : null}
      </section>
    );
  }
}

export default MediaCard;
