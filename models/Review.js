const { required, ref } = require('joi');
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    comment: {
        type: String,
        required: [true, "comment is required"]
    },
    rating: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    product: {
        type:mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

ReviewSchema.index({product:1, user:1}, {unique:true});

ReviewSchema.statics.computeProductRatingAndNumberOfReviews = async function (productId) {
    
    const result =  await this.aggregate([
        {
            $match: {
                product: productId
            }
        },
        {
            $group: {
                _id: null,
                numberOfReviews: { $sum: 1 },
                averageRating: { $avg: "$rating" }
            }
        }
    ]);

    console.log(result);

    try{
        await this.model('Product').findOneAndUpdate({_id: productId}, {
            averageRating: result[0]?.averageRating || 0,
            numberOfReviews: result[0]?.numberOfReviews || 0
        });
    }catch(err){
        console.log(err);
    }
} 

ReviewSchema.pre('save', function() {
    this.constructor.computeProductRatingAndNumberOfReviews(this.product);

});

ReviewSchema.pre('remove', function() {
    this.constructor.computeProductRatingAndNumberOfReviews(this.product);
 
});


module.exports = mongoose.model('Review', ReviewSchema);