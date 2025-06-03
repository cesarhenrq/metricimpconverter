const roundToFiveDecimals = (number) => {
  return Math.round(number * 100000) / 100000;
};

module.exports = {
  roundToFiveDecimals,
};
