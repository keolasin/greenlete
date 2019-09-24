"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      stravaId: DataTypes.INTEGER
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here

    User.hasMany(models.Workout, {
      foreignKey: "userId",
      as: "workouts"
    });

    User.hasMany(models.Litter, {
      foreignKey: "userId",
      as: "litter"
    });
  };
  return User;
};
