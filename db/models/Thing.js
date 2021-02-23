module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define(
    "Thing",
    {
      name: { type: DataTypes.STRING },
      isTreasure: { type: DataTypes.BOOLEAN },
      image: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    }
  );

  return Thing;
};
