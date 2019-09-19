"use strict";
module.exports = (sequelize, DataTypes) => {
  var Litter = sequelize.define(
    "Litter",
    {
      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      workoutId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Litter.associate = function(models) {
    // associations can be defined here
    Litter.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Litter.belongsTo(models.Workout, {
      foreignKey: "workoutId",
      onDelete: "CASCADE"
    });
  };
  return Litter;
};
