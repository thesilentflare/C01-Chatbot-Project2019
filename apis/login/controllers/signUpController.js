const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../configs/database.js')
const config = require('../configs/config/config.json');

class SignUpController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.saltRounds = 10
    }

   addUser() {
       var hashInfo = this.hashPassword(this.req.body.password);
       console.log(hashInfo);
       this.req.body['password'] = hashInfo.hash;
       this.req.body['salt'] = hashInfo.salt;
       console.log(this.res.body);
       User.create(this.req.body).then()
        .catch(err => this.res.status(400).json({
            err: err
        }));
        var token = jwt.sign({ email: this.req.body.email }, config.secret, { expiresIn: '10h' });
        this.res.status(200).json({ token: token});
   }

   hashPassword(password) {
       var salt = bcrypt.genSaltSync(this.saltRounds);
       var hash = bcrypt.hashSync(password, salt);
       return {salt : salt, hash: hash};
   }
   
}

module.exports = SignUpController;