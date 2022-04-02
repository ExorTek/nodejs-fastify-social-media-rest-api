const {register, login, logout, getUser, profilePhotoUpload} = require('../../controllers/auth');
const profileImageUpload = require("../../middlewares/lib/profileImageUpload");

const registerOptions = {
    handler: register,
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
    }
};
const loginOptions = {
    handler: login,
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {type: 'string'},
                password: {type: 'string'}
            }
        }
    }
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
const logoutOptions = {
    handler: logout,
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    success: {type: 'boolean'},
                    message: {type: 'string'}
                }
            }

        }
    }
};
const profileImageOptions = {
    preHandler: profileImageUpload.single('profile_image'),
    body: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                properties: {
                    profile_image: {
                        type: 'binary',
                        format: 'binary',
                    }
                }
            }
        }
    },
    handler: profilePhotoUpload
};
module.exports = {
    registerOptions,
    loginOptions,
    userOptions,
    logoutOptions,
    profileImageOptions
};