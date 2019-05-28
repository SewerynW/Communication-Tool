import React from "react";
import ReactDOM from "react-dom";
import FontAwesomeButton from "./FontAwesomeButton";
import App from "../App/App.test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Tests for FontAwesomeButton component.", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FontAwesomeButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("component include awesome icon inside", () => {
    const component = shallow(<FontAwesomeButton icon={"trash"} />);
    expect(
      component.containsMatchingElement(<FontAwesomeIcon icon={"trash"} />)
    ).toEqual(true);
  });
  it("handle method for onClick good work", () => {
    const OnClick = jest.fn();
    const component = mount(<FontAwesomeButton handleOnClick={OnClick} />);
    component.simulate("click");
    expect(OnClick).toHaveBeenCalled();
  });
});
