const APIError = require("../errors");

const permissions = (...permissions) => {

    return (req, res, next) => {

        const { user } = req;

        const { userId }
 
        if(!permissions.includes(user.role)) {
            throw new APIError.ForbiddenError("unauthorized");
        }

        next();

    }

}

module.exports = permissions;