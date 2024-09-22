const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse } = require("../utils")

const login = async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password) {
        throw new CustomError.BadRequestError("Invalid Username or Password!");
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new CustomError.BadRequestError("Invalid Username or Password!");
    }

    const checkPassword = await user.verifyPassword(password);


    if(!checkPassword) {
        throw new CustomError.BadRequestError("Invalid Username or Password!");
    }

    await attachCookiesToResponse({res, tokenUser: {
        name: user.name,
        userId: user._id
    }})

    return res.status(StatusCodes.OK).json({user})
}

const register = async (req, res) => {
    
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        throw new CustomError.BadRequestError("email, nmae, password already in required.");
    }

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
    
    res.cookie("token", "", {
        expires: new Date(Date.now()),
    }).status(StatusCodes.OK).json({
        msg: "Logout!"
    })
}

module.exports = {
    login,
    register,
    logout
}