/*********
* app.js file
*********/
const express = require('express');
const { promisify } = require('util');

// Get express object
const app = express()

/**
 * Setup server details from congif database infomation 
 * @param config - object containing config infromation
 * @param db - object containing database information
 */
const init = (config, db) => {
	// set all the server things
	app.set('port', config.port);
	app.set('hostname', config.host);
}

/**
 * Start express server
 */
const start = async () => {
	const hostname = app.get('hostname');
	const port = app.get('port');
	await promisify(app.listen).bind(app)(port)
	console.log(`Express server listening on - http://${hostname}:${port}`);
}		    
   
module.exports = {
	init,
	start
};


