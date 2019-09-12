import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { styles } from "../../styles/workouts.js";

import AddWorkout from "./AddWorkout.js";
import MediaCard from "../../common/MediaCard.js";

function Workouts(props) {
  // set-up state hooks for fetching user workouts
  const [userWorkouts, setUserWorkouts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook for fetching workouts from API
  useEffect(() => {
    // nested callback to avoid loops
    const fetchWorkoutData = async () => {
      const result = await axios(`/api/users/${props.userData}/workouts/`);
      setUserWorkouts(result.data);
    };
    fetchWorkoutData();
    setIsLoading(false);
  }, []); // empty array as second argument to useEffect means we only run once, after first render, to avoid infinite loop since state is being changed in our useEffect

  return (
    <article style={styles.container}>
      <AddWorkout userData={props.userData} />
      <h3>Recent workouts</h3>
      <section style={styles.recentWorkouts}>
        {userWorkouts
          ? userWorkouts.map((item, index) => {
              return (
                <MediaCard
                  key={index}
                  headline={item.workoutType}
                  imageSource=""
                  imageAlt="Workout-image"
                  title={item.createdAt}
                  description={`Litter: ${item.litterCount}`}
                />
              );
            })
          : null}
      </section>
    </article>
  );
}

export default Workouts;
