import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "../App";

describe('Route : "/",', () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
