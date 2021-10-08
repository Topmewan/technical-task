const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name to the product'],
        unique:true
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating for a product'],
    },
    description: {
        type: String,
        required:[true, "Please provide product with description"],
    },
    price: {
        type: Number,
        required:[true, "Please provide product with price"],
    },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;