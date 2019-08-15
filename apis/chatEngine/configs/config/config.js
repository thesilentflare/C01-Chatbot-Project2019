/*******
* config.js file
*******/

const _ = require('lodash');
const config = require('./firebase.json');
const defaultConfig = config.local;
const env = process.env.NODE_ENV || 'local';
const envConfig = config[env];


module.exports = _.merge(defaultConfig, envConfig);
