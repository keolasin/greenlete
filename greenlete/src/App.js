import React, { Component, useState, useEffect, useReducer } from "react";
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
import AddWorkouts from "./components/views/Workouts/AddWorkout";

function App() {
  // define state hooks
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect hook for API user auth
  useEffect(() => {
    // nested callback to avoid loops
    const fetchUserData = async () => {
      // async to enable isLoading state
      const result = await axios(`/api/users/check`);
      setUserData(result.data.username);
      console.log(`result from api call: `, result.data.username);
    };
    fetchUserData();
  }, []); // empty array as second arg means we'll only run on componentWillMount lifecycle

  const updateUser = userObject => {
    setUserData(userObject.userData);
    setIsLoggedIn(userObject.isLoggedIn);
    console.log(`userObject from updateUser: `, userObject);
  };

  return (
    <div className="App">
      <Navbar
        updateUser={updateUser}
        loggedIn={isLoggedIn}
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
            <Dashboard {...props} userData={userData} loggedIn={isLoggedIn} />
          )}
        />
        <Route
          path={`/users/${userData}/how_to`}
          render={props => <HowTo {...props} userData={userData} />}
        />
        <Route
          path={`/users/:id/workouts/addWorkout`}
          render={props => <AddWorkouts {...props} />}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
