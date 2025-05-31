function ConvertHandler() {
  this.getNum = function (input) {
    this.validateInput(input);

    const inputWithoutUnit = this.removeUnit(input);
    let result;

    if (inputWithoutUnit === "") {
      return 1;
    }

    if (inputWithoutUnit.includes("/")) {
      const [num, denom] = inputWithoutUnit.split("/");
      result = num / denom;
    } else {
      result = parseFloat(inputWithoutUnit);
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    const allowedUnits = ["L", "gal", "lbs", "kg", "mi", "km"];

    const includeUnit = (unit) => input.includes(unit);

    if (!allowedUnits.some(includeUnit)) {
      throw new Error("invalid unit");
    }

    if (includeUnit("L")) {
      result = "L";
    } else if (includeUnit("gal")) {
      result = "gal";
    } else if (includeUnit("lbs")) {
      result = "lbs";
    } else if (includeUnit("kg")) {
      result = "kg";
    } else if (includeUnit("mi")) {
      result = "mi";
    } else if (includeUnit("km")) {
      result = "km";
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    const unitMap = {
      L: "gal",
      gal: "L",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    result = unitMap[initUnit] || "invalid unit";

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    const unitMap = {
      L: "liters",
      gal: "gallons",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };

    result = unitMap[unit] || "invalid unit";

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    const unitMap = {
      L: galToL,
      gal: 1 / galToL,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
      mi: miToKm,
      km: 1 / miToKm,
    };

    result = initNum * unitMap[initUnit] || "invalid unit";

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    const spellOutUnit = this.spellOutUnit(initUnit);
    const spellOutReturnUnit = this.spellOutUnit(returnUnit);

    result = `${initNum} ${spellOutUnit} converts to ${returnNum} ${spellOutReturnUnit}`;

    return result;
  };

  this.processInput = function (input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
  };

  this.removeUnit = function (input) {
    return input.replace(/[a-zA-Z]/g, "");
  };

  this.validateInput = function (input) {
    const inputWithoutUnit = this.removeUnit(input);

    if (
      inputWithoutUnit.includes("/") &&
      inputWithoutUnit.split("/").length > 2
    ) {
      throw new Error("invalid number");
    }
  };
}

module.exports = ConvertHandler;
