const validateUserInputLogin = (username, password) => {
    return username && password;
};
const validateUserInputRegister = (username, name, email, password) => {
    return username && name && email && password;
};
module.exports = {
    validateUserInputLogin,
    validateUserInputRegister
}