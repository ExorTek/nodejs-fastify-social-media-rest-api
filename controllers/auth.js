const {validateUserInputLogin, validateUserInputRegister} = require('../helpers/input/inputHelper');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');

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
    reply.send({success: true, data: user})
};
module.exports = {
    register
}
