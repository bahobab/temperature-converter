import * as R from "ramda";

const MSGS = {
  LEFT_VALUE: "left_value",
  RIGHT_VALUE: "right_value",
  LEFT_UNIT: "left_unit",
  RIGHT_UNIT: "right_unit",
};

export function leftValueMsg(value) {
  return {
    type: MSGS.LEFT_VALUE,
    value,
  };
}

export function rightValueMsg(value) {
  return {
    type: MSGS.RIGHT_VALUE,
    value,
  };
}

export function leftUnitMsg(unit) {
  return {
    type: MSGS.LEFT_UNIT,
    unit,
    sourceLeft: true,
  };
}

export function rightUnitMsg(unit) {
  return {
    type: MSGS.RIGHT_UNIT,
    unit,
    sourceLeft: false,
  };
}

function update(model, msg) {
  // console.log("msg", msg);
  const { sourceLeft } = model;
  const { type, value, unit } = msg;

  switch (type) {
    case MSGS.LEFT_VALUE:
      if (value === "")
        return { ...model, leftValue: "", rightValue: "", sourceLeft: true };

      const leftValue = parseInt(msg.value);
      return convert({ ...model, sourceLeft: true, leftValue });

    case MSGS.RIGHT_VALUE:
      if (value === "")
        return { ...model, leftValue: "", rightValue: "", sourceLeft: false };

      const rightValue = parseInt(msg.value);
      return convert({ ...model, sourceLeft: false, rightValue });

    case MSGS.LEFT_UNIT:
      if (model.leftValue === "")
        return {
          ...model,
          leftValue: "",
          rightValue: "",
          leftUnit: msg.unit,
          sourceLeft: true,
        };

      return convert({ ...model, leftUnit: msg.unit, sourceLeft: true });

    case MSGS.RIGHT_UNIT:
      if (model.rightValue === "")
        return {
          ...model,
          leftValue: "",
          rightValue: "",
          rightUnit: msg.unit,
          sourceLeft: false,
        };

      // console.log("rightUnit changed. model:", model);
      return convert({ ...model, rightUnit: msg.unit, sourceLeft: false });
    default:
      return model;
  }
}

function round(number) {
  return Math.round(number * 10) / 10;
}

function convert(model) {
  const { leftValue, leftUnit, rightValue, rightUnit } = model;

  // determine which way we're converting
  const [fromUnit, fromTemp, toUnit] = model.sourceLeft
    ? [leftUnit, leftValue, rightUnit]
    : [rightUnit, rightValue, leftUnit];

  const convertedTemp = R.pipe(convertFromToTemp, round)(
    fromUnit,
    toUnit,
    fromTemp
  );

  return model.sourceLeft
    ? { ...model, rightValue: convertedTemp }
    : { ...model, leftValue: convertedTemp };
}

export function convertFromToTemp(fromUnit, toUnit, temp) {
  const convertFn = R.pathOr(R.identity, [fromUnit, toUnit], UnitCoversions);

  return convertFn(temp);
}

export function CtoF(temp) {
  // console.log("Using CtoF:", temp);
  return (9 / 5) * (temp - 32);
}

export function FtoC(temp) {
  // console.log("Using FtoC:", temp);
  return (5 / 9) * temp + 32;
}

export function CtoK(temp) {
  // console.log("Using CtoK:", temp);
  return temp + 273.15;
}

export function KtoC(temp) {
  // console.log("Using KtoC:", temp);
  return temp - 273.15;
}

export const KtoF = R.pipe(KtoC, CtoF);
export const FtoK = R.pipe(FtoC, CtoK);

const UnitCoversions = {
  Celcius: {
    Fahrenheit: CtoF,
    Kelvin: CtoK,
  },
  Fahrenheit: {
    Celcius: FtoC,
    Kelvin: FtoK,
  },
  Kelvin: {
    Celcius: KtoC,
    Fahrenheit: KtoF,
  },
};

export default update;
