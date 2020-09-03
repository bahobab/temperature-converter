import { fireEvent, screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

import {
  CtoF,
  FtoC,
  CtoK,
  KtoC,
  KtoF,
  FtoK,
  convertFromToTemp,
} from "../src/Update";

const html = fs.readFileSync(
  path.resolve(__dirname, "../src/index.html"),
  "utf-8"
);

// const loader = require("html-loader-jest");
// const indexHtml = loader.process(path.resolve(__dirname, "../src/index.html"));
import indexHtml from "../src/index.html";

console.log("html", indexHtml);

let dom;
let container;
let temp;

beforeEach(() => {
  dom = new JSDOM(indexHtml, {
    runScripts: "dangerously",
  });

  container = dom.window.document.body;

  console.log(">>container", dom.window.document.body);

  screen.debug();

  //   document.body.innerHTML = html;
});

describe("Conversion functions", () => {
  it("converts Celcius to Fahrenheit", () => {
    temp = 0;
    expect(CtoF(temp)).toEqual(-57.6);
  });

  it("converts Fahrenheit to Celcius", () => {
    temp = 0;
    expect(FtoC(temp)).toEqual(32);
  });

  it("converts Celcius to Kelvin", () => {
    temp = 0;
    expect(CtoK(temp)).toEqual(273.15);
  });

  it("converts Kelvin to Celcius", () => {
    temp = 0;
    expect(KtoC(temp)).toEqual(-273.15);
  });

  it("converts Fahrenheit to Kelvin", () => {
    temp = 0;
    expect(FtoK(temp)).toEqual(305.15);
  });

  it("converts Kelvin to Farenheit", () => {
    temp = 273.15;
    expect(KtoF(temp)).toEqual(-57.6);
  });

  it("no conversion for same unit", () => {
    temp = 0;

    expect(convertFromToTemp("Celcius", "Celcius", temp)).toEqual(temp);
    expect(convertFromToTemp("Fahrenheit", "Fahrenheit", temp)).toEqual(temp);
    expect(convertFromToTemp("Kelvin", "Kelvin", temp)).toEqual(temp);
  });
});

describe("index.html", () => {
  //   beforeEach(() => {
  //     dom = new JSDOM(html, {
  //       runScripts: "dangerously",
  //     });

  //     container = dom.window.document.body;

  //     console.log(">>container", container);

  //     document.body.innerHTML = html;
  //   });

  //   screen.debug();

  it.skip('renders a heading "Temperature Converter (Celcius, Ferenheit, Kelvin)"', () => {
    const headingText = "Temperature Converter (Celcius, Ferenheit, Kelvin)";

    const element = container.querySelector("h1");

    expect(container.querySelector("h1")).not.toBeNull;
    expect(screen.getByText("Temperature")).toBeVisible();
  });

  it.skip('renders an input field "leftValue"', () => {});

  it.skip('renders an input field "rightValue"', () => {});

  it.skip("renders a select element 'leftUnit'", () => {});

  it.skip('renders a select element "rightUnit"', () => {});
});

describe("automatic temperature conversion", () => {
  describe("when input value changes", () => {
    it.skip("leftValue changes, rightValue is converted", () => {});

    it.skip("rightvalue changes, leftValue is converted", () => {});
  });

  describe("when select unit changes", () => {
    it.skip("leftUnit changes, rightValue is converted", () => {});

    it.skip("right unit change, leftValue is converted", () => {});

    it.skip("leftUnit and rightUnit are the same, leftValue equals rightValue", () => {});
  });
});
