const Sequelize = require('sequelize');
const config = require('./config/config.json')['database'];
const defaultConfig = config.development;

const database = new Sequelize(defaultConfig);

var User = database.define("user",{
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false
  }  //just for now, can do salted hashes later for security
  //salt:
  //saltedHash:
});

database.define("index",{
  indexName: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

/*database.sync().then(function() {
  User.create({
    username:"admin",
    password:"admin"
  });
})*/
