//Routes
const login = require('./login.js');

/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
	// set all the server things
	app.use('/login', login);
}

module.exports = {
	initRoutes
};