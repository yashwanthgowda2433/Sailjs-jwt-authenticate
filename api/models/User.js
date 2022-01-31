'use strict';
const bcrypt = require('bcrypt');

module.exports = {

    attributes: {
        id: { 
            type: 'number', 
            autoIncrement: true, 
            via : "userId"
        },

        name: {
			type: 'string',
			required: true
		},
        
        email: {
			type: 'string',
			required: true,
			isEmail: true,
			unique: true
		},

		password: {
			type: 'string',
			required: true
		},

        number: {
			type: 'number',
			required: true,
			unique: true
		},

        otp: {
			type: 'number',
		},
        login : {
            collection: "logins",
            via : "userId"
        }
        
    },

    // Here we encrypt password before creating a User
    beforeCreate(values, next) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                sails.log.error(err);
                return next();
            }

            bcrypt.hash(values.password, salt, (err, hash) => {
                if (err) {
                    sails.log.error(err);
                    return next();
                }
                values.encryptedPassword = hash; // Here is our encrypted password
                return next();
            });
        });
    },

    comparePassword(password, encryptedPassword) {

        return new Promise(function(resolve, reject) {
            bcrypt.compare(password, encryptedPassword, (err, match) => {
                if (err) {
                    sails.log.error(err);
                    return reject("Something went wrong!");
                }
                if (match) return resolve();
                else return reject("Mismatch passwords");
            });
        });
    }
};