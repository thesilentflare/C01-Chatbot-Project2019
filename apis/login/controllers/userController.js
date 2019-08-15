const jwt = require('jsonwebtoken');
const { User } = require('../configs/database.js');
const config = require('../configs/config/config.json');

class UserController {
    constructor(req, res) { 
        this.req = req;
        this.res = res;
        this.tokenGiven = req.body.token;
    }

    /**
     * Given a user's email return a promise with a json containing
     * basic user details
     * @param email - string of the user's email 
     * @return Promise - contains user's info
     */
    getUserInfo (email) {
        // Find a User that has the given email
        var user = User.findByPk(email);

        // Create a promise with basic detials of found user
        var userPromise = new Promise(function(resolve, reject) {
            user.then( res => {
                if (res != null) {
                    var foundUser = res.dataValues
                    resolve({
                        user: {
                            first: foundUser.firstName,
                            last: foundUser.lastName,
                            email: foundUser.email,
                            admin: foundUser.admin
                        }
                    });
                } else {          
                    reject("No user found");
                }
                
            }).catch(err => {
                reject("No user found");
            });
     
        });
    
        return userPromise
     }

     /**
      * Verify the token of this object and send the related response
      */
    verifyUser() {
        // Check if given token is null
        if (this.tokenGiven != null) {
            // Verify the token and get the decoded payload
           let payload = jwt.verify(this.tokenGiven, config.secret, function(err, decoded){
                if (!err) {
                    return decoded;
                }
            })

            // Check if the payload is not null
            if (payload) {
                // See related user detials of the payload
                let userFound = this.getUserInfo(payload.email);
                userFound.then( res => {
                    this.res.status(200).json(res);
                }).catch(err => {
                    this.res.status(400).json({user: "Error no user found"});
                });
            } else {
                this.res.status(404).json({user: "Error no user found"});
            }
            
            console.log(payload);
        } else {
            this.res.status(400).json({ user: "Error: no token given"});
        }
    }

}

module.exports = UserController;