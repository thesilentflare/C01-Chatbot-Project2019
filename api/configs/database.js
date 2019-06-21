const Sequelize = require('sequelize');
const config = require('./config/config.json')['database'];
const defaultConfig = config.development;

const database = new Sequelize(defaultConfig);

