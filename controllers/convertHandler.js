const { roundToFiveDecimals } = require("../utils");

function ConvertHandler() {
  this.getNum = function (input) {
    const inputWithoutUnit = this.removeUnit(input);

    if (
      inputWithoutUnit.includes("/") &&
      inputWithoutUnit.split("/").length > 2
    ) {
      return "invalid number";
    }

    if (inputWithoutUnit === "") {
      return 1;
    }

    if (inputWithoutUnit.includes("/")) {
      const [num, denom] = inputWithoutUnit.split("/");
      return parseFloat(num) / parseFloat(denom);
    }

    return parseFloat(inputWithoutUnit);
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit";

    const unit = match[0];
    const unitLower = unit.toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    if (!validUnits.includes(unitLower)) {
      return "invalid unit";
    }

    return unitLower === "l" ? "L" : unitLower;
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return unitMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitMap = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return unitMap[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unitMap = {
      gal: initNum * galToL,
      L: initNum / galToL,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      mi: initNum * miToKm,
      km: initNum / miToKm,
    };

    return roundToFiveDecimals(unitMap[initUnit]);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spellOutInitUnit = this.spellOutUnit(initUnit);
    const spellOutReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spellOutInitUnit} converts to ${returnNum} ${spellOutReturnUnit}`;
  };

  this.removeUnit = function (input) {
    return input.replace(/[a-zA-Z]/g, "");
  };
}

module.exports = ConvertHandler;
