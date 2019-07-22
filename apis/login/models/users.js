module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        firstName: {
          type: type.STRING(20),
          allowNull: false,
        },
        lastName: {
          type: type.STRING(20),
          allowNull: false,
        },
        gender: {
          type: type.CHAR(1),
          allowNull: true,
          validate: {
            is: ["[fm]",'i']
          }
        },
        email: {
          type: type.STRING(50),
          validate: {
            isEmail: true,
          },
          allowNull: false,
          unique: true,
          primaryKey: true
        },
        password: {
          type: type.STRING(100),
          allowNull: false
        },
        salt: {
          type: type.STRING(32),
          allowNull: false
        },
        admin: {
          type: type.BOOLEAN,
          allowNull: false
        },
        reason: {
          type: type.TEXT,
          allowNull: true
        }
      },
      {
        freezeTableName: true,
      }
    );

    return User;
}
