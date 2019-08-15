//Routes
const login = require('./login.js');
const signUp = require('./signup.js');
const user = require('./user.js');
const test = require('../userSQL.js');

/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
	// set all the server things
	app.use('/login', login);
	app.use('/signUp', signUp);
	app.use('/user', user);
	app.use('/test', test);
}

module.exports = {
	initRoutes
};