module.exports= (sequelize, DataTypes) => {
    var Index = database.define("index",{
      indexName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      urls: {
        type: Sequelize.JSON, //Sequelize doesnt allow arrays for mySQL
        allowNull: false
      }
    });
  }
  
  
  database.sync().then(function() {
    Index.create({
      indexName: "chatbot",
      urls: ["chatbot.com", "chatbot.com/help","chatbot.com/info"]
    })
  });