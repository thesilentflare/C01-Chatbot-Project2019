/*******
* server.js file
********/ 

const server = require('./configs/app.js');
const config = require('./configs/config/config.js');

console.log(config);
//create the basic server setup 
server.init(config);

//start the server
server.start();
