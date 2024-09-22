const APIError = require("../errors");

const permissions = (...permissions) => {

    return (req, res, next) => {

        const { user } = req;

        const { userId } = req.user;
 
        if(!permissions.includes(user.role)) {
            throw new APIError.ForbiddenError("unauthorized");
        }

        next();

    }

}

module.exports = permissions;