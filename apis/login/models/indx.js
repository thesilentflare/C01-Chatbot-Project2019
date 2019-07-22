module.exports = (sequelize, type) => {
  const Index  = sequelize.define('index', {
    documentName: {
      type: type.STRING(20),
      allowNull: false,
      unique: true
    },
    body: {
      type: type.STRING, //Sequelize doesnt allow arrays for mySQL
      allowNull: false
    }
  });

  return Index;
}
