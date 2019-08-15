// Config
const mysql = require('mysql');
const Sequelize = require('sequelize');
const config = require('./config/config.json')['database'];

// Models
const UserModel = require('../models/users.js');
const IndexModel = require('../models/indx.js');
const ArticleModel = require('../models/article.js');

// Create database instance
var conn = mysql.createConnection({
    port: 3306,
    host: config.development.host,
    user: config.development.username,
    password: config.development.password
  });

console.log(config.development.password);

console.log('connection created');

  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("CREATE DATABASE IF NOT EXISTS app", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
const defaultConfig = config.development;
const sequelize = new Sequelize(defaultConfig);

const User = UserModel(sequelize, Sequelize);
const Index = IndexModel(sequelize, Sequelize);
const Article = ArticleModel(sequelize, Sequelize);

//dummy values
sequelize.sync().then(function() {
  console.log('Database created!');
  Index.findOrCreate({
    where: {
      documentName: "chatbot"
    },
    defaults :{
      documentName: "chatbot",
      body: "Hello this is the document content",
    }
  }),
  User.findOrCreate({
    where:{
      firstName:"us",
      lastName:"er",
    },
    defaults: {
      firstName:"us",
      lastName:"er",
      gender:"F",
      email:"user@mail.utoronto.ca",
      password:"user",
      salt:"ASDF",
      admin: false,
      reason:"I want to use chatbot"
    }
  }),
  User.findOrCreate({
    where:{
      firstName:"ad",
      lastName:"min",
    },
    defaults: {
      firstName:"ad",
      lastName:"min",
      gender:"M",
      email:"admin@mail.utoronto.ca",
      password:"admin",
      salt:"ASDF",
      admin: true,
      reason:"I want to use chatbot"
    }
  });
});

module.exports = {
    User,
    conn,
    Index,
    Article
};
