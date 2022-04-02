'use strict';
const fastify = require('fastify')({logger: true});
const dotenv = require('dotenv');
const fastifyCookie = require('fastify-cookie');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/error/customErrorHandler');
const path = require('path')
dotenv.config({
    path: './config/env/config.env'
});
connectDatabase();
const PORT = process.env.PORT;
fastify.setErrorHandler(customErrorHandler);
fastify.register(require('./routers/index'), {prefix: '/api'});
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix:'/public/'
});
fastify.register(require('fastify-multipart'));
fastify.register(require('fastify-formbody'));
fastify.register(fastifyCookie);
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/',
    swagger: {
        info: {title: 'Fastify Social Media Api'}
    }
});
const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();