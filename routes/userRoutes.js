const express = require("express");

const auth = require("../middleware/authentication");
const permissions = require("../middleware/permissions");

const {
    getAllUser,
    getUser,
    updateUser,
    updateUserPassword,
    getCurrentUser
} = require('../controllers/userController');


const router = express.Router();



router.get("", [auth, permissions("admin")], getAllUser);
router.get("/current-user", [auth], getCurrentUser);
router.get("/:userId", [auth], getUser);
router.patch("/:userId", [auth], updateUser);
router.patch("/update-password/:userId", [auth], updateUserPassword);


module.exports = router;
