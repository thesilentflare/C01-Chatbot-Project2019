//Routes
const login = require('./login.js');
const signUp = require('./signup.js');

/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
	// set all the server things
	app.use('/login', login);
	app.use('/signUp', signUp);
}

module.exports = {
	initRoutes
};