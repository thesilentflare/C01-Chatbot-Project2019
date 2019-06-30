const express = require('express');
const router = express.Router();
const SignUpController = require('../controllers/signUpController.js');

router.post('/', function (req, res) {
    console.log(req);
    const signUp = new SignUpController(req, res);
    signUp.addUser();
    //res.send('Login');
});

module.exports = router