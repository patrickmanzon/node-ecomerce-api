const {createReview, updateReview, getAllReview, getSingleReview, deleteReview} = require("../controllers/reviewController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");


router.get("", getAllReview);
router.post("/", [auth],createReview);
router.get("/:reviewId", getSingleReview);
router.patch("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);


module.exports = router;

