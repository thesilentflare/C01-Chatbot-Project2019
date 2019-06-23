/*******
* server.js file
********/ 

const server = require('./configs/app.js');
const config = require('./configs/config/config.js');
const database = require('./configs/database.js');

//create the basic server setup 
server.init(config, database);

//start the server
server.start();
