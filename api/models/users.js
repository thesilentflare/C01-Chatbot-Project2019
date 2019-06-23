module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('author', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
      },
      {
        freezeTableName: true,
      }
    );

    return User;
  }
