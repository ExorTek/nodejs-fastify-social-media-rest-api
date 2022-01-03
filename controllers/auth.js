const {validateUserInputLogin, validateUserInputRegister, comparePassword} = require('../helpers/input/inputHelper');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {getAccessTokenFromHeaders, isTokenIncluded} = require("../helpers/authorization/tokenHelpers");

const register = async (req, reply) => {
    const {username, name, email, password} = req.body;
    if (!validateUserInputRegister(username, name, email, password)) {
        return new CustomError('Please don\'t empty the input!', 400);
    }
    const user = await User.create({
        username,
        name,
        email,
        password
    });
    sendJwtToClient(user, reply);
};
const login = async (req, reply) => {
    const {username, password} = req.body;
    if (!validateUserInputLogin) {
        return new CustomError('Please don\'t empty the input!', 400);
    }
    const user = await User.findOne({$or: [{username: username}, {email: username}]}).select('+password');
    if (user === null) {
        return new CustomError('Username/Email or Password is incorrect!')
    }
    if (!comparePassword(password, user.password)) {
        return new CustomError('Please check the password!');
    }
    sendJwtToClient(user, reply);
};
const getUser = async (req, reply) => {
    const {JWT_SECRET_KEY} = process.env;
    const accessToken = getAccessTokenFromHeaders(req);
    if (!isTokenIncluded(req)) {
        return new CustomError('You are not authorized to access this route', 401)
    }

    await jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return new CustomError('You are mot authorized to access this route', 401);
        }
        req.user = {
            id: decoded.id,
            createdAt: decoded.createdAt
        };

    });
    const {id} = req.user.id;
    const user = await User.findOne({id});
    try {
        return reply.code(200).send({
            success: true,
            data: {
                name: user.name,
                username: user.username,
                title: user.title,
                about: user.about,
                website: user.website,
                place: user.place,
                profile_image: user.profile_image
            }
        })
    } catch {
        return new CustomError('You dont have Token!', 401);
    }
}
module.exports = {
    register,
    login,
    getUser
}
