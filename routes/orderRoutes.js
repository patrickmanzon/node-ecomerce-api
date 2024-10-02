const {getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder} = require("../controllers/orderController");

const auth = require("../middleware/authentication");
const permissions = require("../middleware/permissions");

const express = require("express");
const router = express.Router();

router.get("", [auth, permissions("admin")], getAllOrders);
router.get("/show-my-orders", [auth], getCurrentUserOrders);
router.get("/:orderId", [auth], getSingleOrder);
router.post("", [auth], createOrder);
router.patch("/:orderId", [auth], updateOrder);

module.exports = router;