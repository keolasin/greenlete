import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { styles } from "../../styles/addWorkout.js";

import AddWorkout from "./AddWorkout.js";

function Workouts(props) {
  // set-up state hooks for fetching user workouts
  const [userWorkouts, setUserWorkouts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook for fetching workouts from API
  useEffect(() => {
    // nested callback to avoid loops
    const fetchUserData = async () => {
      const result = await axios(`/api/users/check`);
      setUserData(result.data.username);
    };
    fetchUserData();
    userData ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setIsLoading(false);
    console.log("loggedIn:", isLoggedIn, "userData: ", userData);
  }, [userData, isLoggedIn]); // array as second arg means we'll only run lifecycles when userData or isLoggedIn changes

  return (
    <article>
      <section>
        Add workouts
        <AddWorkout userData={props.userData} />
      </section>
      <section>List recent workouts section</section>
    </article>
  );
}

export default Workouts;
