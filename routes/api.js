"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    const input = req.query.input;
    const { initNum, initUnit, returnNum, returnUnit, string } =
      convertHandler.processInput(input);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
