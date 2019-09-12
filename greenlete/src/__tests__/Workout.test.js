import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Workouts from "../components/views/Workouts/Workouts";
import AddWorkout from "../components/views/Workouts/AddWorkout";

describe('Route : "workouts", ', () => {
  it("should render a view with recent workouts", () => {
    let component = shallow(<SignUp />);
    expect(component).toContain("Sign up");
  });

  it("should render a view with an add workout form", () => {
    let component = mount(<SignIn />);
    expect(component).toContain("Sign in");
  });
});
