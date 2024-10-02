const { StatusCodes } = require("http-status-codes")
const APIError = require("../errors");
const Product = require("../models/Product");
const Order = require("../models/Order");
const {checkCreator} = require("../utils");

const makePayment = (amount) => {
    return "clientSecret"
}

const getAllOrders = async (req, res) => {

    const orders = await Order.find({});

    return res.status(StatusCodes.OK).json({orders});
}

const getSingleOrder = async (req, res) => {

    const {orderId} = req.params

    const order = await Order.findById(orderId);

    if(!order) {
        throw new APIError.NotFoundError("Order not found!");
    } 

    checkCreator(req.user, order.user);

    return res.status(StatusCodes.OK).json({order});
}

const getCurrentUserOrders = async (req, res) => {

    const {_id:userId} = req.user

    const orders = await Order.find({user: userId});

    return res.status(StatusCodes.OK).json({orders});
}

const createOrder = async (req, res) => {

    const {tax, shippingFee, items} = req.body 
    const {_id:userId} = req.user;


    if(!tax || !shippingFee) {
        throw new APIError.BadRequestError("Tax or Shipping fee is required");
    }

    if(!items && items.length <= 0) {
        throw new APIError.BadRequestError("items is required");
    }

    const orderItems = [];
    let subtotal = 0;

    for (item of items) {

        const {product:productId, amount} = item;

        const { name, price, image } = await Product.findOne({_id: productId});

        orderItems.push({name, price, image, product:item.product, amount});

        subtotal += price * amount;
    } 

    const clientSecret = makePayment(subtotal);

    const order = await Order.create({
        tax,
        shippingFee,
        subtotal,
        orderItems,
        user: userId,
        clientSecret,
    });

    return res.status(StatusCodes.OK).json({order});
}

const updateOrder = async (req, res) => {

    const {orderId} = req.params;
    const { paymentIntentId } = req.body

    if(!paymentIntentId) {
        throw new APIError.BadRequestError("intenr id is required!");
    }

    const order = await Order.findById(orderId);

    if(!order) {
        throw new APIError.NotFoundError("Order not found!");
    }

    checkCreator(req.user, order.user);

    order.status = "paid";
    order.paymentIntentId = paymentIntentId;
    order.save();

    return res.status(StatusCodes.OK).json({order});
}


module.exports = {getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder}