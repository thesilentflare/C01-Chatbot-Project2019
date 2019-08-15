const express = require('express');
const router = express.Router();
const db = require("../configs/firebase")['db'];
const unanswered = require("../controllers/unansweredController")
require('firebase/app');
require('firebase/database');

// Add headers
router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

/**
 * It returns an object of this format
 * {
 * "IBM" : [{user, text, date}, ... ,{...}],
 * "Indexer" : [{user, text, date}, ... ,{...}]
 * }
 */
router.post('/', function (req, res) {
    var content = unanswered.unansweredQuestions();
    
    content.then(function(result) {
        res.send(result);
    }).catch(function(error) {
        res.send("Waiting for messages");
    });

});
   

module.exports = router