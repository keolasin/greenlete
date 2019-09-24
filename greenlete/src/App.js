import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Navbar from "./components/common/Navbar";
import Landing from "./components/views/Landing";
import Footer from "./components/common/Footer";
import SignUp from "./components/views/Login/SignUp";
import SignIn from "./components/views/Login/SignIn";
import Dashboard from "./components/views/Dashboard/Dashboard";
import HowTo from "./components/views/Dashboard/HowTo";
import Workouts from "./components/views/Workouts/Workouts";
import AddWorkouts from "./components/views/Workouts/AddWorkout";
import Mission from "./components/views/Mission.js";

function App() {
  // define state hooks
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect hook for user auth API
  useEffect(() => {
    // nested callback to avoid loops
    const fetchUserData = async () => {
      // async to enable isLoading state
      const result = await axios(`/api/users/check`);
      setUserData(result.data.username);
    };
    fetchUserData();
    userData ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setIsLoading(false);
  }, [userData, isLoggedIn]); // array as second arg means we'll only run lifecycles when userData or isLoggedIn changes

  const updateUser = userObject => {
    setUserData(userObject.username);
    setIsLoggedIn(userObject.isLoggedIn);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="App">
      <Navbar
        updateUser={updateUser}
        isLoggedIn={isLoggedIn}
        userData={userData}
      />
      <main>
        <Route
          exact
          path="/"
          render={props =>
            isLoggedIn ? (
              <Redirect to={`/users/${userData}/dashboard`} />
            ) : (
              <Landing {...props} />
            )
          }
        />
        <Route
          path="/mission"
          render={props => (
            <Mission {...props} updateUser={updateUser} userData={userData} />
          )}
        />
        <Route
          path="/users/sign_up"
          render={props => (
            <SignUp {...props} updateUser={updateUser} userData={userData} />
          )}
        />
        <Route
          path="/users/sign_in"
          render={props => (
            <SignIn {...props} updateUser={updateUser} userData={userData} />
          )}
        />
        <Route
          path={`/users/${userData}/dashboard`}
          render={props => (
            <Dashboard {...props} userData={userData} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          path={`/users/${userData}/how_to`}
          render={props => <HowTo {...props} userData={userData} />}
        />
        <Route
          path={`/users/${userData}/workouts`}
          render={props => <Workouts {...props} userData={userData} />}
        />
        <Route
          path={`/users/${userData}/workouts/addWorkout`}
          render={props => <AddWorkouts {...props} userData={userData} />}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
