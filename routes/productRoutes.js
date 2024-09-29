const { 
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage, 
    getProductReviews
} = require("../controllers/productController");

const permissions = require("../middleware/permissions");
const auth = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.get("", getAllProducts);
router.post("", [auth, permissions("admin")], createProduct);
router.get("/:productId", getSingleProduct);
router.patch("/:productId", [auth, permissions("admin")], updateProduct);
router.delete("/:productId", [auth, permissions("admin")], deleteProduct);
router.post("/upload", [auth, permissions("admin")], uploadImage);

router.get("/:productId/reviews", getProductReviews);


module.exports = router

