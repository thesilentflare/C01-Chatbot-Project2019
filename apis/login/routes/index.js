//Routes
const login = require('./login.js');
const signUp = require('./signup.js');
const index = require('./indexer.js');
/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
	// set all the server things
	app.use('/login', login);
	app.use('/signUp', signUp);
	app.use('/index', index);
}

module.exports = {
	initRoutes
};
