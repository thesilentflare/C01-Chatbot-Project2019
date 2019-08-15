//Routes
const message = require('./message.js');

/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
	// set all the server things
	app.use('/message', message);
}

module.exports = {
	initRoutes
};