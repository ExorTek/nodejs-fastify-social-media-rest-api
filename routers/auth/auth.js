const {registerOptions, loginOptions} = require('./authSchema');

async function auth(fastify) {
    // fastify.get('/', async (req, reply) => {
    //     reply.send({message: "I am Auth"});
    // })
    fastify.post('/register',registerOptions)
}

module.exports = auth;