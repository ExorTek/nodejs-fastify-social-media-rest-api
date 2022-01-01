const {registerOptions, loginOptions} = require('./authSchema');

async function auth(fastify) {
    fastify.post('/register',registerOptions);
    fastify.post('/login',loginOptions);
}

module.exports = auth;