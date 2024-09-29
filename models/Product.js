
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    description: {
        type: String,
        required: [true, "Descriptuion is required"]
    },
    image: {
        type: String,
        default: ["/uploads/no-image.png"]
    },
    category: {
        type: String,
        required: [true, "category is required"],
        enum: {
            values: ["office", 'kitchen', 'bedroom'],
            message: '{VALUE} is not supported' 
        },
    },
    company: {
        type: String,
        enum: {
            values: ["marcos", 'liddy', 'ikea'],
            message: '{VALUE} is not supported' 
        },
        required: [true, "company name is required"]
    },
    colors: {
        type: [String],
        default: []
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        default: 15
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User id is required"]
    },
    
    
}, { timestamps: true });


module.exports = mongoose.model("Product", ProductSchema);