const { Thing } = require("../db/models");

exports.garbageList = async (req, res, next) => {
  try {
    const garbage = await Thing.findAll({
      where: {
        isTreasure: false,
      },
    });
    res.json(garbage);
  } catch (error) {
    next(error);
  }
};

exports.treasureList = async (req, res, next) => {
  try {
    const garbage = await Thing.findAll({
      where: {
        isTreasure: true,
      },
    });
    res.json(garbage);
  } catch (error) {
    next(error);
  }
};
