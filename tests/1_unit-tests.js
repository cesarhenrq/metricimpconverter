const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Tests for getNum", function () {
    test("should correctly read a whole number", function () {
      const input = "10L";
      const result = convertHandler.getNum(input);
      const expected = 10;
      assert.strictEqual(result, expected);
    });

    test("should correctly read a decimal number", function () {
      const input = "10.5L";
      const result = convertHandler.getNum(input);
      const expected = 10.5;
      assert.strictEqual(result, expected);
    });

    test("should correctly read a fractional number", function () {
      const input = "10/2L";
      const result = convertHandler.getNum(input);
      const expected = 5;
      assert.strictEqual(result, expected);
    });

    test("should correctly read a fractional number with a decimal", function () {
      const input = "10.5/2L";
      const result = convertHandler.getNum(input);
      const expected = 5.25;
      assert.strictEqual(result, expected);
    });

    test("should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
      const input = "3/2/3L";
      assert.throws(() => convertHandler.getNum(input), Error);
    });

    test("should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      const input = "L";
      const result = convertHandler.getNum(input);
      const expected = 1;
      assert.strictEqual(result, expected);
    });
  });

  suite("Tests for getUnit", function () {
    test("should correctly read each of the units", function () {
      const allowedUnits = ["L", "gal", "lbs", "kg", "mi", "km"];
      allowedUnits.forEach((unit) => {
        const input = `${unit}10`;
        assert.doesNotThrow(() => convertHandler.getUnit(input));
      });
    });

    test("should correctly return an error for an invalid unit", function () {
      const input = "10invalid";
      assert.throws(() => convertHandler.getUnit(input), Error);
    });

    test("should return the correct return unit for each valid input unit", function () {
      const allowedUnits = ["L", "gal", "lbs", "kg", "mi", "km"];
      allowedUnits.forEach((unit) => {
        const input = `${unit}10`;
        const result = convertHandler.getUnit(input);
        const expected = unit;
        assert.strictEqual(result, expected);
      });
    });
  });

  suite("Tests for spellOutUnit", function () {
    test("should correctly return the spelled-out string unit for each valid input unit", function () {
      const unitMap = {
        L: "liters",
        gal: "gallons",
        lbs: "pounds",
        kg: "kilograms",
        mi: "miles",
        km: "kilometers",
      };

      const allowedUnits = ["L", "gal", "lbs", "kg", "mi", "km"];
      allowedUnits.forEach((unit) => {
        const result = convertHandler.spellOutUnit(unit);
        const expected = unitMap[unit];
        assert.strictEqual(result, expected);
      });
    });
  });

  suite("Tests for convert", function () {
    test("should correctly convert gal to L", function () {
      const initNum = 1;
      const initUnit = "gal";
      const result = convertHandler.convert(initNum, initUnit);
      const expected = 1 / 3.78541;
      assert.strictEqual(result, expected);
    });

    test("should correctly convert L to gal", function () {
      const initNum = 1;
      const initUnit = "L";
      const result = convertHandler.convert(initNum, initUnit);
      const expected = 3.78541;
      assert.strictEqual(result, expected);
    });

    test("should correctly convert lbs to kg", function () {
      const initNum = 1;
      const initUnit = "lbs";
      const result = convertHandler.convert(initNum, initUnit);
      const expected = 0.453592;
      assert.strictEqual(result, expected);
    });

    test("should correctly convert kg to lbs", function () {
      const initNum = 1;
      const initUnit = "kg";
      const result = convertHandler.convert(initNum, initUnit);
      const expected = 1 / 0.453592;
      assert.strictEqual(result, expected);
    });

    test("should correctly convert mi to km", function () {
      const initNum = 1;
      const initUnit = "mi";
      const result = convertHandler.convert(initNum, initUnit);
      const expected = 1.60934;
      assert.strictEqual(result, expected);
    });

    test("should correctly convert km to mi", function () {
      const initNum = 1;
      const initUnit = "km";
      const result = convertHandler.convert(initNum, initUnit);
      const expected = 1 / 1.60934;
      assert.strictEqual(result, expected);
    });
  });
});
