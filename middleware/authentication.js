const jwt = require('jsonwebtoken');
const User = require("../models/User");
const APIError = require("../errors");


const auth = async (req, res ,next) => {

    const {token} = req.signedCookies;

    try {
        
        const {payload} = await jwt.verify(token, process.env.JWT_KEY);
        
        const user = await User.findOne({_id: payload.userId}).select("-password");

        req.user = user;
       
        next();

    } catch (error) {
        console.log(error);
        throw new APIError.UnauthenticatedError("unauthorized");
    }



}


module.exports = auth