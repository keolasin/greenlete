"use strict";
module.exports = (sequelize, DataTypes) => {
  var Litter = sequelize.define(
    "Litter",
    {
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
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

    Litter.addScope("lastTwentyFor", userId => {
      return {
        where: { userId: userId },
        limit: 20,
        order: [["createdAt", "DESC"]]
      };
    });
  };
  return Litter;
};
