const {validateUserInputLogin, validateUserInputRegister, comparePassword} = require('../helpers/input/inputHelper');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const {sendJwtToClient,} = require("../helpers/authorization/tokenHelpers");
const {getAccessRoute} = require('../middlewares/authorization/auth');
const profileImageUpload = require('../middlewares/lib/profileImageUpload');
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
    await getAccessRoute(req);
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
};
const logout = async (req, reply) => {
    await getAccessRoute(req);
    const {NODE_ENV} = process.env;
    return reply
        .code(200)
        .setCookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        })
        .send({
            success: true,
            message: 'Logout Successfull'
        });
};
const profilePhotoUpload = async (req, reply) => {
    await getAccessRoute(req);
    await User.findByIdAndUpdate(req.user.id, {
        'profile_image': req.savedImage
    }, {
        new: true,
        runValidators: true
    });
    return reply.code(200).send({
        success: true,
        message: 'Image upload successful',
    });
};
module.exports = {
    register,
    login,
    getUser,
    logout,
    profilePhotoUpload
}
