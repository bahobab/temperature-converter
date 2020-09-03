import { h } from "virtual-dom";
import hh from "hyperscript-helpers";
import * as R from "ramda";

import {
  leftValueMsg,
  leftUnitMsg,
  rightUnitMsg,
  rightValueMsg,
} from "./Update";

const { pre, div, h1, h3, input, select, option, p } = hh(h);

const UNITS = ["Celcius", "Fahrenheit", "Kelvin"];

function unitOptions(selectedUnit) {
  return UNITS.map((unit) => {
    return option({ value: unit, selected: unit === selectedUnit }, unit);
  });
  //   return R.map(
  //     (unit) => option({ value: unit, selected: unit === selectedUnit }, unit),
  //     UNITS
  //   );
}

function unitSection(dispatch, value, unit, oninput, onchange) {
  return div({ className: "cf ph2-ns" }, [
    input({
      className: "db input-reset ba w-100 mv2 pa2",
      type: "number",
      value,
      oninput: (e) => dispatch(oninput(e.target.value)),
    }),
    ,
    select(
      {
        className: "db w-100 pa2 ba",
        onchange: (e) => dispatch(onchange(e.target.value)),
      },
      unitOptions(unit)
    ),
  ]);
}

function view(model, dispatch) {
  return div({ className: "w-100 center" }, [
    div({ className: "mw9 ph3 center" }, [
      div({ className: "w-100 tc" }, [
        h1({ className: "f2 pv0 mb0 tc" }, "Temperature Converter"),
        h3({ className: "pb2 tc bb" }, "(Celcius, Ferenheit, Kelvin)"),
      ]),
      div({ className: "fl w-100 w-50-ns pa2" }, [
        unitSection(
          dispatch,
          model.leftValue,
          model.leftUnit,
          leftValueMsg,
          leftUnitMsg
        ),
      ]),
      div({ className: "fl w-100 w-50-ns pa2" }, [
        unitSection(
          dispatch,
          model.rightValue,
          model.rightUnit,
          rightValueMsg,
          rightUnitMsg
        ),
      ]),
      // div({ className: "w-100" }, pre(JSON.stringify(model))),
    ]),
  ]);
}

export default view;
