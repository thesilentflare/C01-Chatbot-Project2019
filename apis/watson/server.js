const server = require('./config/app.js');
const config = require('./config/config.json')['local'];

//create the basic server setup 
server.init(config);

//start the server
server.start();