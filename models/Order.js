const { required, ref } = require("joi");
const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    image: {
        type: String,
        required: [true, "Product Image is required"]
    }, 
    name: {
        type: String,
        required: [true, "Producat name is required"]
    },
    amount: {
        type:Number,
        required: [true, "Amount is required"]
    },
});

const OrderSchema = new mongoose.Schema({
    tax: {
        type: Number,
        required: [true, "Tax is required"]
    },
    shippingFee: {
        type: Number,
        required: [true, "Shipping fee is required"]
    },
    subtotal: {
        type:Number,
        required: [true, "Subtotal is required"]
    },

    orderItems: {
        type: [OrderItemsSchema],
        required: [true, "Items is required!"]
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "paid", "failed"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    clientSecret: {
        type: String
    },
    paymentId: {
        type: String
    },

});

module.exports = mongoose.model("Order", OrderSchema);