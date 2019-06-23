const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('author', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        salt: {
          type: Sequelize.STRING(32),
          allowNull: false
        },
        admin: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
      },
      {
        freezeTableName: true,
      }
    );

    return User;
  }
