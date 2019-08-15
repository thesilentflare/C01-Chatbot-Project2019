//Routes
const message = require('./message.js');
const watson = require('./watson.js');
const faq = require('./faq.js');
const query = require('./query.js');
const uploadFile = require('./uploadFile.js');
const uploadUrl = require('./uploadUrl.js');
const emotions = require('./emotions.js');
const unanswered = require('./unanswered.js');

/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
	// set all the server things
	app.use('/message', message);
	app.use('/watson', watson);
	app.use('/faq', faq);
	app.use('/query', query);
	app.use('/file', uploadFile);
	app.use('/url', uploadUrl);
	app.use('/emotions', emotions);
	app.use('/unanswered', unanswered);

}

module.exports = {
	initRoutes
};