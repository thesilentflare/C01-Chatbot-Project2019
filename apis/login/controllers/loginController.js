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

    /**
     * Authenticate the credentias of this login controller
     */
    authenticate() {
        if (this.email != null && this.password != null) {
            // Get user hashed and salted credentials from db's users table
            var users = this.getCredentials();

            // very password and send token response
            users.then((user, err) => {
                if (user != null) {
                    console.log(user.dataValues);
                    // Compare the the given password to the password of user in db 
                    const match = bcrypt.compareSync(this.password, user.dataValues.password);
                    
                    // Verify login crednetials are valid
                    if (match) {
                        console.log("Credentials match!");
                        var token = jwt.sign({ email: this.email }, config.secret, { expiresIn: '10h' });
                        this.res.status(200).json({ token: token});
                    } else {
                        console.log("Credentials do not match!");
                        this.res.status(403).json({message: "Incorrect password"});
                    }
                } else {
                    this.res.status(404).json({message: "Incorrect email"});
                }
                
            });
        } else {
            this.res.status(400).json({message: "Email or password cannot be null"});
        }
    }

    /**
     * Find the user in db related to this email
     * @return Promise - user related to this email
     */
    getCredentials() {
       var user = User.findByPk(this.email);

        return user
    }
}

module.exports = LoginController;