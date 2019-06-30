const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../configs/database.js');
const config = require('../configs/config/config.json');

class LoginController {
    constructor(req, res) { 
        this.req = req;
        this.res = res;
        this.email = req.body.email;
        this.password = req.body.password;
        this.user = null;
    }

    authenticate() {
        if (this.email != null && this.password != null) {
            // Get user hashed and salted credentials from db's users table
            var users = this.getCredentials();
            users.then((users, err) => {
                //this.user = users[0].dataValues;
                console.log(users[0].dataValues);
                //match = bcrypt.compareSync(this.password, this.user.password);*/
                var user = users[0].dataValues;
                //match = bcrypt.compareSync(this.password, this.user.password);
                console.log(user.password);
                // compare the credentials
                const match = bcrypt.compareSync(this.password, user.password);
                
                // Verify login crednetials are valid
                if (match) {
                    console.log("Credentials match!");
                    var token = jwt.sign({ email: this.email }, config.secret, { expiresIn: '1h' });
                    this.res.status(200).json({ token: token});

                    console.log(token);
                } else {
                    console.log("Credentials do not match!");
                }
                
            });
        }
    }

    getCredentials() {
       var users = User.findAll({
            where: {
                email: this.email
            },
            limit: 1
        });

        return users
    }
}

module.exports = LoginController;