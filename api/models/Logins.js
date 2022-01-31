'use strict';

module.exports = {

    attributes: {
        id: { 
            type: 'number', 
            autoIncrement: true, 
        },
        userId: {
            model: 'user'
        },
        logintime: {
			type: 'string',
			required: true
		},
        // Add a reference to User
        owners: {
            collection: 'user',
            via: 'login'
        }
    },
};