const Sequelize = require('sequelize');
const config = require('./config/config.json')['database'];
const defaultConfig = config.development;

const database = new Sequelize(defaultConfig);

  var User = database.define("user",{
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true
  },
  firstname: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  gender: {
    type: Sequelize.ENUM('M','F'),
    allowNull: false
  },
  reason: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(32),
    allowNull: false
  }  //just for now, can do salted hashes later for security
  //salt:
  //saltedHash:
});

var Admin = database.define("admins",{
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true
  },
  adminToken: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  firstname: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING(30),
    allowNull: false,
  }
});


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

database.sync().then(function() {
  Admin.create({
    email:"admin@mail.utoronto.ca",
    password:"admin",
    firstname:"ad",
    lastname:"min",
    adminToken:"ASDFFASDFASDFA"
  }),
  User.create({
    email:"user@mail.utoronto.ca",
    password:"user",
    gender:"F",
    firstname:"us",
    lastname:"er",
    reason:"I want to use chatbot"
  }),
  Index.create({
    indexName: "chatbot",
    urls: ["chatbot.com", "chatbot.com/help","chatbot.com/info"]
  })
});
