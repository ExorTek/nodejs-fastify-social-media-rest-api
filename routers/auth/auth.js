const {registerOptions, loginOptions, userOptions, logoutOptions,profileImageOptions} = require('./authSchema');
const profileImageUpload = require("../../middlewares/lib/profileImageUpload");
const {profilePhotoUpload} = require("../../controllers/auth");
async function auth(fastify) {
    fastify.post('/register', registerOptions);
    fastify.post('/login', loginOptions);
    fastify.post(
        '/profileImage',
        profileImageOptions
    )
    fastify.get('/profile', userOptions);
    fastify.get('/logout', logoutOptions);
}

module.exports = auth;