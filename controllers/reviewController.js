const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const APIError = require("../errors");
const Review = require("../models/Review");
const {checkCreator} = require("../utils");



const createReview = async (req, res) => {

    const { product: productId } = req.body;

    const userId = req.user._id.toString();

    const checkProductExists = await Product.findOne({_id:productId});

    if(!checkProductExists) {
        throw new APIError.NotFoundError("Product not found!");
    }

    const userReviewExists = await Review.findOne({
        user: userId,
        product: productId
    });

    if(userReviewExists) 
    {
        throw new APIError.BadRequestError("You already reviewed the product!");
    }

    req.body.user = userId;
    const review = await Review.create(req.body);

    return res.status(StatusCodes.OK).json({review})
}

const updateReview = async (req, res) => {

    const {title, comment, rating} = req.body;
    const {reviewId} = req.params;

    const review = await Review.findOne({_id:reviewId});

    if(!review) {
        throw new APIError.NotFoundError("review not found!");
    }

    checkCreator(req.user, review.user) 

    review.title = title;
    review.comment = comment;
    review.rating = rating;

    review.save();

    return res.status(StatusCodes.CREATED).json({review})
}

const getAllReview = async (req, res) => {

    const reviews = await Review.find({})
        .populate("product", "name price description")
        .populate("user", "name");

    return res.status(StatusCodes.OK).json({reviews})
}

const getSingleReview = async (req, res) => {

    const {reviewId} = req.params;

    const review = await Review.findOne({_id: reviewId});

    if(!review) {
        throw new APIError.NotFoundError("review not found!");
    }

    return res.status(StatusCodes.OK).json({review})
}

const deleteReview = async (req, res) => {

    const {reviewId} = req.params;

    const review = await Review.findOne({_id:reviewId});

    if(!review) {
        throw new APIError.NotFoundError("review not found!");
    }

    checkCreator(req.user, review.user) 

    review.remove();

    return res.status(StatusCodes.CREATED).json({})
}


module.exports = {
    createReview, 
    updateReview, 
    getAllReview, 
    getSingleReview, 
    deleteReview
}