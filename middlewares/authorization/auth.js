const {getAccessTokenFromHeaders, isTokenIncluded} = require("../../helpers/authorization/tokenHelpers");
const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const getAccessRoute = async (req) => {
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
};
module.exports = {getAccessRoute}