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
      duration: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      litterCount: {
        type: Sequelize.INTEGER,
        allowNull: false
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
