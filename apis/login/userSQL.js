const mysql = require ('mysql');
const express = require('express');
const router = express.Router();
const connection = require('./configs/database')['conn']

// module.exports exports this function so it can be required by another file
// must pass in the file with the Express application

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

router.post('/', function (req, res) {
    connection.query('SELECT * FROM app.user', function(err, data) {
        (err)?res.send(err):res.json({users: data});
    });
});

router.post('/modify', function (req, res) {
    let sql = 'UPDATE app.user \
                SET app.user.firstName = ?,  app.user.lastName = ?,\
                app.user.gender = ?, app.user.password = ?\
                WHERE app.user.email = ?;';
    let data = [req.body.firstName, req.body.lastName, req.body.gender, req.body.password, req.body.email];
    connection.query(sql, data, function(err, data) {
        (err)?res.send(err):res.json({users: data});
    });
});


router.delete('/', function (req, res) {
    let sql = 'DELETE FROM app.user\
                WHERE app.user.email = ?;';
    connection.query(sql, req.body.email, function(err, data) {
        (err)?res.send(err):res.json({users: data});
    });
});


module.exports = router;
