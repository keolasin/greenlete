import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Litter from "../components/views/Litter/Litter";
import AddWorkout from "../components/views/Litter/AddLitter";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";

describe('Route : "litter", ', () => {
  it("should render a view with a mapbox GL map", () => {
    let component = mount(<LitterMap />);
    expect(component).toContain("mapbox");
  });
});
