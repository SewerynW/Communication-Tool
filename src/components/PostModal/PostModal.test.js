import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./../App/App";
import PostModal from "./PostModal";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CardMedia } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("Tests for PostModal component", () => {
  const mockFn = jest.fn();
  const postModalWrapper = (
    <PostModal
      postTitle="Title"
      postContent="Content"
      postPublishDate="Date"
      onClose={mockFn}
      open
      postImage="image"
    />
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Component renders without a problem", () => {
    const div = document.createElement("div");
    render(postModalWrapper, div);
    unmountComponentAtNode(div);
  });
  it("Close button handle onClick method", () => {
    const wrapper = mount(postModalWrapper);
    const button = wrapper.find("button").first();
    button.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
  it("Get title from props", () => {
    const wrapper = mount(postModalWrapper);
    const title = wrapper.find("h2");
    expect(title.text()).toBe("Title");
  });
  it("Get text content from props", () => {
    const wrapper = mount(postModalWrapper);
    const content = wrapper.find("p").first();
    expect(content.text()).toBe("Content");
  });
  it("Get publish date from props", () => {
    const wrapper = mount(postModalWrapper);
    const date = wrapper.find("p.modal_publishDate");
    expect(date.text()).toBe("Date");
  });
  it("Get image address from props", () => {
    const wrapper = mount(postModalWrapper);
    const img = wrapper.find("CardMedia");
    expect(img.prop("image")).toBe("image");
  });
});
