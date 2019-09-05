import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { styles } from "../../styles/addWorkout.js";

import AddWorkout from "./AddWorkout.js";

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

  console.log("userWorkouts", userWorkouts);
  return (
    <article>
      <section>
        Add workouts
        <AddWorkout userData={props.userData} />
      </section>
      <section>
        Recent workouts
        {userWorkouts
          ? userWorkouts.map((item, index) => {
              return (
                <li key={index}>
                  {item.workoutType} {item.createdAt}
                </li>
              );
            })
          : null}
      </section>
    </article>
  );
}

export default Workouts;
