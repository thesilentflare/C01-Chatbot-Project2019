module.exports = (sequelize, type) => {
    const Article = sequelize.define('article', {
        name: {
            type: type.STRING(100),
            allowNull: false,
            primaryKey: true,
            unique: true
        },

        url: {
            type: type.STRING(500),
            allowNull: false
        },
        keywords: {
            type: type.STRING(1000),
            allowNull: false,
        },
        text: {
            type: type.TEXT,
            allowNull: true
        },
        frequency: {
          type: type.DOUBLE,
          allowNull: false,
        }
      },
      {
        freezeTableName: true,
      }
    );

    return Article;
}
