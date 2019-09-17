import React, { Component } from "react";
import { styles } from "../styles/card";
import Button from "@material-ui/core/Button";
import EditWorkout from "../views/Workouts/EditWorkout";
import DeleteWorkout from "../views/Workouts/DeleteWorkout";

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
      isWorkout,
      workoutData,
      userData
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
            <EditWorkout workoutData={workoutData} userData={userData} />
            <DeleteWorkout workoutData={workoutData} userData={userData} />
          </section>
        ) : null}
      </section>
    );
  }
}

export default MediaCard;
