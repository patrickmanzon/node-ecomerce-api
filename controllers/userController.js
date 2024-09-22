
const getAllUser = (req, res) => {
    res.json({msg: "getAllUser"});
}

const getUser = (req, res) => {
    res.json({msg: "getUser"});
}

const updateUser = (req, res) => {
    res.json({msg: "updateUser"});
}

const updateUserPassword = (req, res) => {
    res.json({msg: "updateUserPassword"});
}

const getCurrentUser = (req, res) => {
    res.json({msg: "getCurrentUser"});
} 

module.exports = {
    getAllUser,
    getUser,
    updateUser,
    updateUserPassword,
    getCurrentUser
}