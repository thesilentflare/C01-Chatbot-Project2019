const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginController.js');

router.post('/', function (req, res) {
    console.log("New login attempt");
    const login = new LoginController(req, res);
    login.authenticate();
    res = login.res;
});

module.exports = router