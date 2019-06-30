const bcrypt = require('bcrypt-nodejs');
const { User } = require('../configs/database.js')

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
       User.create(this.req.body)
            .then()
            .catch(err => this.res.status(400).json({
                err: err
            }));
   }

   hashPassword(password) {
       var salt = bcrypt.genSaltSync(this.saltRounds);
       var hash = bcrypt.hashSync(password, salt);
       return {salt : salt, hash: hash};
   }
   
}

module.exports = SignUpController;