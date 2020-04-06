import React from "react";
import Grid from "./Grid";
import { mount } from "enzyme";
import { defaultsDeep } from "lodash";

jest.mock("./Connector", () => {
  return function Connector() {
    return null;
  };
});

const props = (custom = {}) => ({
  "data-tray": defaultsDeep(custom, {
    coords: {
      x: 100,
      y: 100,
    },
    connector: {
      name: "string",
      iconURL: "a url",
    },
  }),
});

describe("Full details: edit view", () => {
  let gridInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    gridInstance = mount(<Grid {...props()} />);

    expect(gridInstance.exists()).toBe(true);
  });
  it("renders every time new data is passed in props", () => {
    gridInstance = mount(<Grid {...props()} />);
    gridInstance.setProps(
      props({ coords: { x: 2 }, connector: { name: "second" } }),
    );
    gridInstance.update();

    expect(gridInstance.find("Connector").length).toEqual(2);
  });

  describe("invalid data handling", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      gridInstance = mount(<Grid {...props()} />);
    });
    it("does not update if the new data is equal to the prev data", () => {
      gridInstance.setProps(props());
      gridInstance.update();

      expect(gridInstance.find("Connector").length).toEqual(1);
    });
    it("does not update if the coords are nil", () => {
      gridInstance.setProps(props({ coords: undefined }));
      gridInstance.update();

      expect(gridInstance.find("Connector").length).toEqual(1);
    });
    it("does not update if the connector field is nil", () => {
      gridInstance.setProps(props({ connector: undefined }));
      gridInstance.update();

      expect(gridInstance.find("Connector").length).toEqual(1);
    });
    it("does not update if the coords x value is outside of the 0-1000 range", () => {
      gridInstance.setProps(
        props({
          coords: { x: -100 },
          connector: { name: "second" },
        }),
      );
      gridInstance.update();
      gridInstance.setProps(
        props({
          coords: { x: 2000 },
          connector: { name: "third" },
        }),
      );
      gridInstance.update();

      expect(gridInstance.find("Connector").length).toEqual(1);
    });
    it("does not update if the coords y value is outside of the 0-1000 range", () => {
      gridInstance.setProps(
        props({
          coords: { y: -100 },
          connector: { name: "second" },
        }),
      );
      gridInstance.update();
      gridInstance.setProps(
        props({
          coords: { y: 2000 },
          connector: { name: "third" },
        }),
      );
      gridInstance.update();

      expect(gridInstance.find("Connector").length).toEqual(1);
    });
  });
});
