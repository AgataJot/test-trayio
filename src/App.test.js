import React from "react";
import App from "./App";
import { mount } from "enzyme";

jest.mock("@trayio/builder-squad-event-emitter", () => {
  return function Emitter() {
    return null;
  };
});

describe("Full details: edit view", () => {
  let gridInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    gridInstance = mount(<App />);

    expect(gridInstance.exists()).toBe(true);
  });
});
