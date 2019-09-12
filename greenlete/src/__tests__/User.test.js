import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import SignUp from "../components/views/Login/SignUp";
import SignIn from "../components/views/Login/SignIn";

describe('Route : "users", ', () => {
  it("should render a view with a sign up form", () => {
    let component = shallow(<SignUp />);
    expect(component).toContain("Sign up");
  });

  it("should render a view with a sign in form", () => {
    let component = shallow(<SignIn />);
    expect(component).toContain("Sign in");
  });
});
