const express = require("express");
const {
    getAllUser,
    getUser,
    updateUser,
    updateUserPassword,
    getCurrentUser
} = require('../controllers/userController');
const router = express.Router();



router.get("", getAllUser);
router.get("/current-user", getCurrentUser);
router.get("/:userId", getUser);
router.patch("", updateUser);
router.patch("/update-password", updateUserPassword);


module.exports = router;
