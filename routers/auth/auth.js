const {registerOptions, loginOptions, userOptions} = require('./authSchema');

async function auth(fastify) {
    fastify.post('/register', registerOptions);
    fastify.post('/login', loginOptions);
    fastify.get('/profile', userOptions);
}

module.exports = auth;