const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const APIError = require("../errors");



const getAllUser = async (req, res) => {

    const users = await User.find({}).select("-password");

    return res.status(StatusCodes.OK).json({users});
}

const getUser = async (req, res) => {

    const { userId } = req.params;

    const user = await User.findOne({_id: userId});

    if(!user) {
        throw new APIError.NotFoundError("user not found");
    }

    return res.status(StatusCodes.OK).json({user});
} 

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    if(!name || !email) {
        throw new APIError.BadRequestError("name and email are required");
    }

    const user = await User.findOne({_id: userId});

    if(!user) {
        throw new APIError.NotFoundError("user not found");
    }
 
    user.name = name;
    user.email = email;
    user.save();


    return res.status(StatusCodes.CREATED).json({user});
}

const updateUserPassword = async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({_id: userId});

    if(!user) {
        throw new APIError.NotFoundError("user not found");
    }

    const passwordChecker = await user.verifyPassword(oldPassword);

    if(!passwordChecker) {
        throw new APIError.UnauthenticatedError("Invalid paspsword");
    }

    user.password = newPassword;
    user.save();

    return res.status(StatusCodes.CREATED).json({user});
}

const getCurrentUser = (req, res) => {
    res.status(StatusCodes.OK).json({user:req.user});
} 

module.exports = {
    getAllUser,
    getUser,
    updateUser,
    updateUserPassword,
    getCurrentUser
}