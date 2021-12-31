const apiRoute = async (fastify) => {
    fastify.get('/', (req, reply) => {
        reply.send({success: true, message: 'Welcome To Social Media RestAPI'});
    })
    fastify.register(require('./auth/auth'), {prefix: 'auth'});
};
module.exports = apiRoute;