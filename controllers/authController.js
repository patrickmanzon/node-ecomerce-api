const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse} = require("../utils")

const login = (req, res) => {
    res.send("login");
}

const register = async (req, res) => {
    
    const { name, email, password } = req.body;

    const emailChecker = await User.findOne({email});
    
    if(emailChecker) {
        throw new CustomError.BadRequestError("email already in use.");
    }

    const firstUser = await User.findOne({});
    
    const role = firstUser ? "user" : "admin";

    const user = await User.create({name, email, password, role});

    await attachCookiesToResponse({res, tokenUser: {
        name: user.name,
        userId: user._id
    }})

   return res.status(StatusCodes.CREATED).json({user});

}

const logout = (req, res) => {
    res.send("logout")
}

module.exports = {
    login,
    register,
    logout
}