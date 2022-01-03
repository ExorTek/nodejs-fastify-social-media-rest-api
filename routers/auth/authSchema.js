const {register, login, getUser} = require('../../controllers/auth');
const {getAccessToRoute} = require("../../middlewares/authorization/auth");

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
const userOptions = {
    handler: getUser,
    type: 'object',
    properties: {
        id: {type: 'number'},
        username: {type: 'string'},
        name: {type: 'string'},

    }
};
module.exports = {
    registerOptions,
    loginOptions,
    userOptions
};