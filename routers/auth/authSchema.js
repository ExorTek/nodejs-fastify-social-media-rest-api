const {register, login, getUser} = require('../../controllers/auth');

const registerOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {type: 'string'},
                name: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'}
            }
        }
    },
    handler: register
};
const loginOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {type: 'string'},
                password: {type: 'string'}
            }
        }
    },
    handler: login
};
const userOptions = {
    handler: getUser,
    schema: {
        header: {
                type: 'object',
                properties: {
                    authorization: {type: 'string'}
                }
        }
    }
};
module.exports = {
    registerOptions,
    loginOptions,
    userOptions
};