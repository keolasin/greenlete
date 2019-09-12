"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Workouts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workoutType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distance: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      distanceUnits: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      litterCount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Workouts");
  }
};
