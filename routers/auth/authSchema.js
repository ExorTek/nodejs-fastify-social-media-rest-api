const {register, login} = require('../../controllers/auth');
const registerOptions = {
    type: 'object',
    properties: {
        username: {type: 'string'},
        name: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'}
    },
    handler: register
};
const loginOptions = {
    type: 'object',
    properties: {
        username: {type: 'string'},
        password: {type: 'string'}
    },
    handler: login
};
module.exports = {
    registerOptions,
    loginOptions
};