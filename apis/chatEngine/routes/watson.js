const express = require('express');
const router = express.Router();
const db = require("../configs/firebase")['db'];
const watson = require("../controllers/watsonController");
const message = require("../controllers/messageController");
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

router.post('/', function(req, res) {
    message.send(req);
    var response = watson.send(req);
    response.then(function(result) {
        res.send({text: result[0]});
    }).catch(function(error) {
        res.json({text: "IBM Watson has timed out. Please restart your session."});
    });
});
    

module.exports = router