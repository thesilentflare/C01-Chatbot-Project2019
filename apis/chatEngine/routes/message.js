const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController.js');
const db = require("../configs/firebase")['db'];
const message = require("../controllers/messageController")
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


router.post('/display', function (req, res) {
    var content = message.display();

    // the object returned from message is promisified,
    // the then statement is used to get the content
    // the catch is there if it fails
    content.then(function(result) {
        res.send(result);
    }).catch(function(error) {
        res.send("Waiting for messages");
    });
});

router.post('/send', function(req, res) {
    message.send(req);
    res.send("success");
});



    

module.exports = router