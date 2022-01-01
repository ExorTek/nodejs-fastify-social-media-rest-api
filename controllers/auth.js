const {validateUserInputLogin, validateUserInputRegister, comparePassword} = require('../helpers/input/inputHelper');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const {sendJwtToClient} = require("../helpers/auth/sendJwtToClient");

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
}
module.exports = {
    register,
    login
}
