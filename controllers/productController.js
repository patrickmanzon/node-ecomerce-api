const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes")
const APIError = require('../errors');
const path = require('path');
const Review = require("../models/Review");


const getAllProducts = async (req, res) => {

    const products = await Product.find({});

    return res.status(StatusCodes.OK).json({products});
}

const getSingleProduct = async (req, res) => {

    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product) {
        throw new APIError.NotFoundError("Product not found!");
    }

    return res.status(StatusCodes.OK).json({product});
}

const createProduct = async (req, res) => {

    req.body.user = req.user._id.toString();

    const product = await Product.create(req.body);


    return res.status(StatusCodes.CREATED).json({product});
}

const updateProduct = async (req, res) => {

    const {productId} = req.params;

    const product = await Product.findOneAndUpdate({_id: productId}, req.body,  { new: true, runValidators: true });

    if(!product) {
        throw new APIError.NotFoundError("Product not found!");
    }

    return res.status(StatusCodes.CREATED).json({product});
}

const deleteProduct = async (req, res) => {
    const {productId} = req.params;

    const product = await Product.findOneAndDelete({_id: productId});

    if(!product) {
        throw new APIError.NotFoundError("Product not found!");
    }

    return res.status(StatusCodes.CREATED).json({});
}

const uploadImage = async (req, res) => {

    const { image } = req.files;
    
    const imagePath = path.join(__dirname+'/../public/uploads/'+image.name);

    await image.mv(imagePath);

    return res.status(StatusCodes.CREATED).json({src: 'public/uploads/'+image.name});
}

const getProductReviews = async (req, res) => {
    
    const {productId} = req.params;

    const productExists = await Product.findOne({_id:productId});

    if(!productExists) {
        throw new APIError.NotFoundError("product not found!");
    }

    const reviews = await Review.find({product: productId });

    return res.status(StatusCodes.OK).json({reviews});

}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    getProductReviews
}