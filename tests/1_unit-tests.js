const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
const { roundToFiveDecimals } = require("../utils");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Tests for getNum", function () {
    test("should correctly read a whole number", function () {
      const input = "10L";
      const result = convertHandler.getNum(input);
      assert.strictEqual(result, 10);
    });

    test("should correctly read a decimal number", function () {
      const input = "10.5L";
      const result = convertHandler.getNum(input);
      assert.strictEqual(result, 10.5);
    });

    test("should correctly read a fractional number", function () {
      const input = "10/2L";
      const result = convertHandler.getNum(input);
      assert.strictEqual(result, 5);
    });

    test("should correctly read a fractional number with a decimal", function () {
      const input = "10.5/2L";
      const result = convertHandler.getNum(input);
      assert.strictEqual(result, 5.25);
    });

    test("should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
      const input = "3/2/3L";
      const result = convertHandler.getNum(input);
      assert.strictEqual(result, "invalid number");
    });

    test("should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      const input = "L";
      const result = convertHandler.getNum(input);
      assert.strictEqual(result, 1);
    });
  });

  suite("Tests for getUnit", function () {
    test("should correctly read each of the units", function () {
      const allowedUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
      allowedUnits.forEach((unit) => {
        const input = `10${unit}`;
        const result = convertHandler.getUnit(input);
        assert.strictEqual(result, unit);
      });
    });

    test("should correctly return an error for an invalid unit", function () {
      const input = "10invalid";
      const result = convertHandler.getUnit(input);
      assert.strictEqual(result, "invalid unit");
    });

    test("should return the correct return unit for each valid input unit", function () {
      const unitMap = {
        gal: "L",
        L: "gal",
        mi: "km",
        km: "mi",
        lbs: "kg",
        kg: "lbs",
      };

      Object.keys(unitMap).forEach((unit) => {
        const expected = unitMap[unit];
        const result = convertHandler.getReturnUnit(unit);
        assert.strictEqual(result, expected);
      });
    });
  });

  suite("Tests for spellOutUnit", function () {
    test("should correctly return the spelled-out string unit for each valid input unit", function () {
      const unitMap = {
        gal: "gallons",
        L: "liters",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms",
      };

      Object.keys(unitMap).forEach((unit) => {
        const result = convertHandler.spellOutUnit(unit);
        const expected = unitMap[unit];
        assert.strictEqual(result, expected);
      });
    });
  });

  suite("Tests for convert", function () {
    test("should correctly convert gal to L", function () {
      const result = convertHandler.convert(1, "gal");
      const expected = 3.78541;
      assert.approximately(result, expected, 0.1);
    });

    test("should correctly convert L to gal", function () {
      const result = convertHandler.convert(1, "L");
      const expected = roundToFiveDecimals(1 / 3.78541);
      assert.approximately(result, expected, 0.1);
    });

    test("should correctly convert mi to km", function () {
      const result = convertHandler.convert(1, "mi");
      const expected = 1.60934;
      assert.approximately(result, expected, 0.1);
    });

    test("should correctly convert km to mi", function () {
      const result = convertHandler.convert(1, "km");
      const expected = roundToFiveDecimals(1 / 1.60934);
      assert.approximately(result, expected, 0.1);
    });

    test("should correctly convert lbs to kg", function () {
      const result = convertHandler.convert(1, "lbs");
      const expected = 0.453592;
      assert.approximately(result, expected, 0.1);
    });

    test("should correctly convert kg to lbs", function () {
      const result = convertHandler.convert(1, "kg");
      const expected = roundToFiveDecimals(1 / 0.453592);
      assert.approximately(result, expected, 0.1);
    });
  });
});
