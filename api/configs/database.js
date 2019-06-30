// Config 
const mysql = require('mysql');
const Sequelize = require('sequelize');
const config = require('./config/config.json')['database'];

// Models
const UserModel = require('../models/users.js');

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

sequelize.sync().then(function() {
    console.log('Database created!');
});

module.exports = {
    User
};
