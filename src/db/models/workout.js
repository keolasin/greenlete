"use strict";
module.exports = (sequelize, DataTypes) => {
  var Workout = sequelize.define(
    "Workout",
    {
      workoutType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      distanceUnits: {
        type: DataTypes.STRING,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      litterCount: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Workout.associate = function(models) {
    // associations can be defined here
    Workout.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Workout.addScope("lastTenFor", userId => {
      return {
        where: { userId: userId },
        limit: 10,
        order: [["createdAt", "DESC"]]
      };
    });
  };
  return Workout;
};
