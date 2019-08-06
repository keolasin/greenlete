import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import SignUp from "../components/SignUp";

describe('Route : "users", ', () => {
  it("should render a view with a sign up form", done => {
    const component = shallow(<SignUp />);
    expect(component).toContain("Sign up");
  });
});
