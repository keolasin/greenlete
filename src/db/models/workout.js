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
    Workout.belongsTo(models.User),
      {
        foreignKey: "userId",
        onDelete: "CASCADE"
      };
    // associations can be defined here
  };
  return Workout;
};
